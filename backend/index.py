from datetime import datetime
from flask_jwt_extended import (
    get_jwt,JWTManager, create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies
)
from flask import Flask, request, jsonify, make_response, request, render_template, session, flash
from datetime import timedelta
from functools import wraps
from flask_pymongo import PyMongo
import os
from flask_cors import CORS,cross_origin
from graphene import ObjectType, Schema, Field, List, String,ID
from bson import ObjectId
from graphene import Schema, Field, List
from graphene import Mutation
from graphql import GraphQLError
from mongoengine import Document, StringField, ImageField
import bcrypt
from arabic_reshaper import reshape
import sys
sys.path.append('./backend')
import models
blacklist = set()

app = Flask(__name__)


app.config['JWT_SECRET_KEY'] = 'a4182a271076405ab98ea34cf70615c7'
# how to get a secret key
# In your command line >>> access Python >>> then type:

# OS Approach
# import os
# os.urandom(14)

# UUID Approach
# import uuid
# uuid.uuid4().hex

# Secrets [ only for Python 3.6 + ]
#import secrets
# secrets.token_urlsafe(14)
app.config['MONGO_URI'] =os.environ.get('MONGO_URI', 'mongodb://localhost:27017/MLProjet') 

mongo = PyMongo(app)
jwt = JWTManager(app)

CORS(app)



# Database,users:name of table
user_collection  = mongo.db.users
score_collection  = mongo.db.scores


# @app.before_request
@app.before_first_request
def create_users_table():
    db = mongo.db
    if 'users' not in db.list_collection_names():
        db.create_collection('users')
        password="admin"
        password_hash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        user = {
            'firstname': "admin",
            'lastname': "admin",
            'password': password_hash,
            'email': "admin@gmail.com",
            'school': "",
            'level': "",
            'role': "admin",
            'image':"",
        }
        user_collection.insert_one(user)
    if 'scores' not in db.list_collection_names():
        db.create_collection('scores')
        

class User(ObjectType):
    _id = String()
    firstname = String()
    lastname = String()
    email = String()
    password = String()
    school = String()
    level =String()
    role = String()
    image = String()
    access_token = String()

class Score(ObjectType):
    _id = String()
    idQuestion = String()
    score = String()
    user_id = String()
    reponse= String()
    date = String()
    userName = String()
    image=String()
   
   

    
class RegisterUser(Mutation):
    class Arguments:
        firstname = String()
        lastname = String()
        email = String()
        password = String()
        school = String()
        level =String()
        image=String()

    user = Field(lambda: User)

    def mutate(self, info, firstname,lastname, email, password,school,level,image):
        
        if user_collection.find_one({'email': email}):    
            raise GraphQLError("User with email already exists!")
        password_hash = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        role="student"
        # Save user to database
        user = {
            'firstname': firstname,
            'lastname': lastname,
            'password': password_hash,
            'email': email,
            'school': school,
            'level': level,
            'role': role,
            'image':image,
        }
        result = user_collection.insert_one(user)
        print(result.inserted_id)
        user['_id'] = str(result.inserted_id)
        return RegisterUser(user=user)
    
class LoginUser(Mutation):
    class Arguments:
        id=String()
        email = String()
        password = String()

    user = Field(lambda: User)

    def mutate(self, info, email, password):
        user = user_collection.find_one({'email': email})
        if not user:
            raise GraphQLError('Invalid email')
        if bcrypt.checkpw(password.encode('utf8'), user['password']):
            # Generate access token
            access_token = create_access_token(identity=str(user['_id']), expires_delta=timedelta(minutes=60000))
            user['access_token']=access_token
            # Return access token
            # return {'access_token': access_token}, 200
            return LoginUser(user=user)

        # Wrong password
        raise GraphQLError('Invalid password')
 
class LogoutUser(Mutation):


    user = Field(lambda: User)
    @jwt_required()
    def mutate(self, info):
        jwt_data = get_jwt()
        user_id = get_jwt_identity()
        user = user_collection.find_one({'_id': ObjectId(user_id)})
        if not user:
            raise Exception('User not found')
        exp_timestamp = jwt_data['exp']
        blacklist.add(user_id+str(exp_timestamp))
        response = jsonify({'message': 'Logged out successfully'})
        unset_jwt_cookies(response)#this function not working properly, so i add blacklist 9waleb
        return LogoutUser(user=user)
class GetScore(Mutation):
    class Arguments:
        idQuestion = String()
        reponse = String()
        


    score = Field(lambda: Score)
    @jwt_required()
    def mutate(self, info,idQuestion,reponse):
        model=models.Model()

        rep={'جواب':[reponse]}
        print(rep)
        scoreQ=model.predict(int(idQuestion),rep)
        if scoreQ != 0:
            scoreQ=str(scoreQ[0])
        user_id = get_jwt_identity()
        user = user_collection.find_one({'_id': ObjectId(user_id)})
    
        score = {
            'idQuestion': idQuestion,
            'score': scoreQ,
            'user_id': user_id,
            'reponse':reponse,
            'date':datetime.now(),
        }
        result = score_collection.insert_one(score)
        # print(result.inserted_id)
        score['_id'] = str(result.inserted_id)
        return GetScore(score=score) 
class Query(ObjectType):
    current_user = Field(lambda: User)
    scores_current_user = List(lambda: Score)
    scores_alluser = List(lambda: Score)

    @jwt_required()
    def resolve_current_user(root, info):
        user_id = get_jwt_identity()
        jwt_data = get_jwt()
        exp_timestamp = jwt_data['exp']
        user = user_collection.find_one({'_id': ObjectId(user_id)})
        if not user:
            raise Exception('User not found')
        if user_id+str(exp_timestamp) in blacklist:
            raise Exception('User has logout')
        scores = score_collection.find({ "user_id": user_id })
        score_list = []
        for score in scores:
            print(score['_id'])
            score_list.append(score)
        return User(_id=user_id, firstname=user['firstname'], email=user['email'],image=user['image'],role=user['role'],level=user['level'],school=user['school'])
    
    @jwt_required()
    def resolve_scores_current_user(root, info):
        user_id = get_jwt_identity()
        scores = score_collection.find({ "user_id": user_id })
        score_list = []
        x='sss'
        for score in scores:
            print(score['_id'])
            score_list.append(score)
        return score_list
    
    @jwt_required()
    def resolve_scores_alluser(root, info):
        scores = score_collection.find()
        score_list = []
        for score in scores:
           
            user_id = score.get('user_id')
            user = user_collection.find_one({'_id': ObjectId(user_id)})
            if user:
                score['userName'] = f"{user['firstname']} {user['lastname']}"
                score['image'] = f"{user['image']}"
            else:
                score['userName'] = None
                score['image'] = None
            score_list.append(score)
        return score_list
    

 
class Mutation(ObjectType):
    register_user = RegisterUser.Field()
    logout_user = LogoutUser.Field()
    login_user = LoginUser.Field()
    get_score = GetScore.Field()
    # find_user = FindUser.Field()


schema = Schema(query=Query, mutation=Mutation) 

@app.route('/graphql_auth', methods=['POST'])
@cross_origin()

def graphql():
    data = request.get_json(force=True)
    result = schema.execute(data['query'], variables=data['variables'])

    
    return jsonify(result.to_dict())
    # return {
    #     "data":result.data,
    #       "errors":result.errors[0]
    # }




if __name__ == "__main__":
    app.run(debug=True)


# unset_jwt_cookies(response) est une méthode qui supprime les cookies JWT de l'objet de réponse Flask donné en paramètre.

# Dans une application Flask qui utilise l'authentification JWT, le serveur envoie des tokens JWT sous forme de cookies 
# dans la réponse pour être stockés côté client. Lorsqu'un utilisateur se déconnecte ou que le token est expiré ou révoqué, 
# le serveur doit supprimer ces cookies de la réponse pour empêcher l'utilisateur d'accéder aux ressources protégées.

# La méthode unset_jwt_cookies fournie par la bibliothèque Flask-JWT-Extended permet de supprimer ces cookies en appelant 
# cette méthode avec l'objet de réponse Flask en tant que paramètre. Cette méthode supprime tous les cookies de JWT dans 
# l'objet de réponse Flask.(tester sur facebook supprimer les cookies,ajouter backlist pour supprimer aussi au niveau du serveur pas important)