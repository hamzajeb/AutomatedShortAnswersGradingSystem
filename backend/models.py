import pandas as pd
import numpy as np
import nltk
import re
import string
import pickle
import utils
from arabic_reshaper import reshape
from sklearn.svm import SVC
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem.isri import ISRIStemmer
from gensim.models import Word2Vec
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.svm import SVC

# Download stopwords and WordNetLemmatizer
nltk.download('stopwords')
nltk.download('wordnet')

# Load data
data1 = pd.read_csv('./backend/data/data1.csv', encoding='utf-8')
data2 = pd.read_csv('./backend/data/data2.csv', encoding='utf-8')
data3 = pd.read_csv('./backend/data/data3.csv', encoding='utf-8')
data4 = pd.read_csv('./backend/data/data4.csv', encoding='utf-8')
data5 = pd.read_csv('./backend/data/data5.csv', encoding='utf-8')
data6 = pd.read_csv('./backend/data/data6.csv', encoding='utf-8')
data7 = pd.read_csv('./backend/data/data7.csv', encoding='utf-8')
data8 = pd.read_csv('./backend/data/data8.csv', encoding='utf-8')
data9 = pd.read_csv('./backend/data/data9.csv', encoding='utf-8')
# Charger les stopwords en arabe
stop_words = set(stopwords.words('arabic'))
# ISRIStemmer() est utilisé pour normaliser les mots en arabe avant de procéder à l'analyse sémantique.
stemmer = ISRIStemmer()


# --- Function to clean the data --- #
def cleanData(text):
     # Remove diacritics
    text = reshape(text)
    # Remove punctuation and convert to lowercase
    # Normalize hamza and alif variants
    text = re.sub('\[.*?\]', '', text) # Remove everything between []
    text = re.sub('\(.*?\)', '', text) # Remove everything between ()
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text) # Remove punctuation
    text = re.sub('[‘’“”«»…]', '', text) # Remove specific caracters
    text = re.sub("-_،؟ ً َّ ًّ ّ ٌّ َ ً ُ ٌ ٍ ِ ْ ٍّ ِّ", '', text) # Remove specific arabic caracters
    text = re.sub('\n', '', text) # Remove '\n'
    text = re.sub('[أإآا]', 'ا', text)
    text = re.sub('[ىي]', 'ي', text)
    text = re.sub('[ؤئ]', 'ء', text)
    # Remove extra spaces
    text = re.sub('\s+', ' ', text).strip() 
    return text  

def pipeline_preprocess_text(text):
    clean_text=cleanData(text)
    tokens = nltk.word_tokenize(clean_text)
    filtered_tokens = [word for word in tokens if not word in stop_words]
    stemmed_tokens = [stemmer.stem(word) for word in filtered_tokens]
    return stemmed_tokens


# Convert text to Word2Vec vectors
sentences1 = [pipeline_preprocess_text(text) for text in data1['جواب']]
model_Word2Vec_1 = Word2Vec(sentences1,vector_size=100, min_count=1)
sentences2 = [pipeline_preprocess_text(text) for text in data2['جواب']]
model_Word2Vec_2 = Word2Vec(sentences2,vector_size=100, min_count=1)
sentences3 = [pipeline_preprocess_text(text) for text in data3['جواب']]
model_Word2Vec_3 = Word2Vec(sentences3,vector_size=100, min_count=1)
sentences4 = [pipeline_preprocess_text(text) for text in data4['جواب']]
model_Word2Vec_4 = Word2Vec(sentences4,vector_size=100, min_count=1)
sentences5 = [pipeline_preprocess_text(text) for text in data5['جواب']]
model_Word2Vec_5 = Word2Vec(sentences5,vector_size=100, min_count=1)
sentences6 = [pipeline_preprocess_text(text) for text in data6['جواب']]
model_Word2Vec_6 = Word2Vec(sentences6,vector_size=100, min_count=1)
sentences7 = [pipeline_preprocess_text(text) for text in data7['جواب']]
model_Word2Vec_7 = Word2Vec(sentences7,vector_size=100, min_count=1)
sentences8 = [pipeline_preprocess_text(text) for text in data8['جواب']]
model_Word2Vec_8 = Word2Vec(sentences8,vector_size=100, min_count=1)
sentences9 = [pipeline_preprocess_text(text) for text in data9['جواب']]
model_Word2Vec_9 = Word2Vec(sentences9,vector_size=100, min_count=1)

def vectorize_text(idQuestion,text):
    # Convert text to Word2Vec vectors
    vectors = []
    for line in pipeline_preprocess_text(text):
        try:
        # Les vecteurs de mots Word2Vec sont basés sur une approche d'apprentissage non supervisé appelée « modèle de langue ». 
        # Le but de ce modèle est d'apprendre une représentation vectorielle dense pour chaque mot d'un vocabulaire donné en se 
        # basant uniquement sur un grand corpus de textes.
        # La logique derrière les vecteurs de mots Word2Vec est que les mots qui apparaissent dans des contextes similaires 
        # ont tendance à avoir des significations similaires. Par exemple, les mots "chien" et "chat" ont tendance à apparaître 
        # dans des contextes similaires (par exemple, dans des phrases sur les animaux domestiques), donc ils ont des vecteurs 
        # similaires dans l'espace vectoriel Word2Vec.
            if idQuestion == 1:
                vector = model_Word2Vec_1.wv[line]
                vectors.append(vector)  
            elif idQuestion == 2 :
                vector = model_Word2Vec_2.wv[line]
                vectors.append(vector)  
            elif idQuestion == 3 :
                vector = model_Word2Vec_3.wv[line]
                vectors.append(vector) 
            elif idQuestion == 4 :
                vector = model_Word2Vec_4.wv[line]
                vectors.append(vector) 
            elif idQuestion == 5 :
                vector = model_Word2Vec_5.wv[line]
                vectors.append(vector)  
            elif idQuestion == 6 :
                vector = model_Word2Vec_6.wv[line]
                vectors.append(vector) 
            elif idQuestion == 7 :
                vector = model_Word2Vec_7.wv[line]
                vectors.append(vector)    
            elif idQuestion == 8 :
                vector = model_Word2Vec_8.wv[line]
                vectors.append(vector) 
            elif idQuestion == 9 :
                vector = model_Word2Vec_9.wv[line]
                vectors.append(vector) 
        except KeyError:
            pass
        # Calculer la moyenne des vecteurs des mots dans une phrase est une méthode simple et efficace pour obtenir 
        # une représentation vectorielle de la phrase. L'idée derrière cette méthode est que le sens global d'une phrase 
        # peut être approximé par la moyenne des sens de ses mots individuels. Les vecteurs de mots Word2Vec sont conçus 
        # de telle sorte que des mots similaires ont des vecteurs similaires, donc la moyenne des vecteurs des mots dans 
        # une phrase devrait capturer une partie du sens de la phrase. En outre, la moyenne des vecteurs de mots est un 
        # moyen simple de réduire la dimensionnalité du vecteur de la phrase, car les vecteurs de mots Word2Vec ont 
        # souvent une dimensionnalité élevée (typiquement 100 à 300 dimensions).
    return np.mean(vectors, axis=0)
# --- Training models class (KNN, DT, ANN, NB, SVM) --- #
class Model:

    def __init__(self, x=None, y=None):
        # Constructor with arguments
        if x is not None and y is not None:
            self.x = x
            self.y = y
        else:
            # Constructor without arguments
            self.x = None
            self.y = None

        

    def train(self) :
        X_train, X_test, y_train, y_test = train_test_split(self.x, self.y, test_size=0.2, random_state=18)
        svclassifierPoly = SVC(kernel='poly', degree=8)
        svclassifierPoly.fit(X_train, y_train)
        svclassifierGaussian = SVC(kernel='rbf', degree=8)
        svclassifierGaussian.fit(X_train, y_train)
        KNN = KNeighborsClassifier(n_neighbors=3)
        KNN.fit(X_train, y_train)
        dtc = DecisionTreeClassifier()
        dtc.fit(X_train, y_train) 
        rfc = RandomForestClassifier()
        rfc.fit(X_train, y_train)
        svc = LinearSVC()
        svc.fit(X_train, y_train)
        dtc_pred = dtc.predict(X_test)
        rfc_pred = rfc.predict(X_test)
        svc_pred = svc.predict(X_test)
        knn_pred = KNN.predict(X_test)
        svclassifierPoly_pred = svclassifierPoly.predict(X_test)
        svclassifierGaussian_pred = svclassifierGaussian.predict(X_test)

        #  Accuracy : mesure de performance du classification
        print("Decision Tree Classifier:")
        print("Accuracy:", accuracy_score(y_test, dtc_pred))
        print()

        print("Random Forest Classifier:")
        print("Accuracy:", accuracy_score(y_test, rfc_pred))
        print()

        print("Linear Support Vector Classifier:")
        print("Accuracy:", accuracy_score(y_test, svc_pred))
        print()

        print("KNN:")
        print("Accuracy:", accuracy_score(y_test, knn_pred))
        print()

        print("SVM poly:")
        print("Accuracy:", accuracy_score(y_test, svclassifierPoly_pred))
        print()

        print("SVM RBF:")
        print("Accuracy:", accuracy_score(y_test, svclassifierGaussian_pred ))
        print()
        # save module by pickle : 
        # pickle.dump(svclassifierGaussian, open('model1.sav', 'wb'))
        # pickle.dump(svclassifierGaussian, open('model2.sav', 'wb'))
        # pickle.dump(svclassifierGaussian, open('model3.sav', 'wb'))
        pickle.dump(KNN, open('model4.sav', 'wb'))
        

    def predict(self,idQuestion, text):
        df = pd.DataFrame(text)
        if idQuestion == 1:
            print(df['جواب'][0])
            if utils.verifyQuestion1(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model1.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                print(Class)
                return Class
        elif idQuestion == 2:
            if utils.verifyQuestion2(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model2.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 3:
            if utils.verifyQuestion3(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model3.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 4:
            if utils.verifyQuestion4(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model4.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 5:
            if utils.verifyQuestion5(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model5.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 6:
            if utils.verifyQuestion6(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model6.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 7:
            if utils.verifyQuestion7(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model7.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        
        elif idQuestion == 8:
            if utils.verifyQuestion8(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model8.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        elif idQuestion == 9:
            if utils.verifyQuestion9(df['جواب'][0]):
                vectorize_answer = np.array([vectorize_text(idQuestion,text) for text in df['جواب']])
                loaded_model = pickle.load(open('./backend/model9.sav', 'rb'))
                Class=loaded_model.predict(vectorize_answer)
                return Class
        return 0
    
    def accuracy(self,idQuestion):
        X_train, X_test, y_train, y_test = train_test_split(self.x, self.y, test_size=0.2, random_state=18)
        if idQuestion==1:
            loaded_model1 = pickle.load(open('model1.sav', 'rb'))
            y_pred1=loaded_model1.predict(X_test)
            print("Accuracy Model 1:", accuracy_score(y_test, y_pred1))
        elif idQuestion==2:
            loaded_model2 = pickle.load(open('model2.sav', 'rb'))
            y_pred2=loaded_model2.predict(X_test)
            print("Accuracy Model 2:", accuracy_score(y_test, y_pred2))
        elif idQuestion==3:
            loaded_model3 = pickle.load(open('model3.sav', 'rb'))
            y_pred2=loaded_model3.predict(X_test)
            print("Accuracy Model 3:", accuracy_score(y_test, y_pred2))
        elif idQuestion==4:
            loaded_model4 = pickle.load(open('model4.sav', 'rb'))
            y_pred2=loaded_model4.predict(X_test)
            print("Accuracy Model 4:", accuracy_score(y_test, y_pred2))
        elif idQuestion==5:
            loaded_model5 = pickle.load(open('model5.sav', 'rb'))
            y_pred2=loaded_model5.predict(X_test)
            print("Accuracy Model 5:", accuracy_score(y_test, y_pred2))
        elif idQuestion==6:
            loaded_model6 = pickle.load(open('model6.sav', 'rb'))
            y_pred2=loaded_model6.predict(X_test)
            print("Accuracy Model 6:", accuracy_score(y_test, y_pred2))
        elif idQuestion==7:
            loaded_model7 = pickle.load(open('model7.sav', 'rb'))
            y_pred2=loaded_model7.predict(X_test)
            print("Accuracy Model 7:", accuracy_score(y_test, y_pred2))
        elif idQuestion==8:
            loaded_model8 = pickle.load(open('model8.sav', 'rb'))
            y_pred2=loaded_model8.predict(X_test)
            print("Accuracy Model 8:", accuracy_score(y_test, y_pred2))
        elif idQuestion==9:
            loaded_model9 = pickle.load(open('model9.sav', 'rb'))
            y_pred2=loaded_model9.predict(X_test)
            print("Accuracy Model 9:", accuracy_score(y_test, y_pred2))



#################################################


if __name__ == '__main__':
    model1 = Model(np.array([vectorize_text(1,text) for text in data1['جواب']]), data1['تنقيط'])
    # # model1.train()
    model1.accuracy(1)

    model2 = Model(np.array([vectorize_text(2,text) for text in data2['جواب']]), data2['تنقيط'])
    # # model2.train()
    model2.accuracy(2)

    model3 = Model(np.array([vectorize_text(3,text) for text in data3['جواب']]), data3['تنقيط'])
    # model3.train()
    model3.accuracy(3)

    model4 = Model(np.array([vectorize_text(4,text) for text in data4['جواب']]), data4['تنقيط'])
    # model4.train()
    model4.accuracy(4)

    model5 = Model(np.array([vectorize_text(5,text) for text in data5['جواب']]), data5['تنقيط'])
    #model5.train()
    model5.accuracy(5)

    model6 = Model(np.array([vectorize_text(6,text) for text in data6['جواب']]), data6['تنقيط'])
    #model6.train()
    model6.accuracy(6)


    model7 = Model(np.array([vectorize_text(7,text) for text in data7['جواب']]), data7['تنقيط'])
    #model7.train()
    model7.accuracy(7)

    model8 = Model(np.array([vectorize_text(8,text) for text in data8['جواب']]), data8['تنقيط'])
    #model8.train()
    model8.accuracy(8)

    model9 = Model(np.array([vectorize_text(9,text) for text in data9['جواب']]), data9['تنقيط'])
   # model9.train()
    model9.accuracy(9)

    t1={'جواب':["محمد السادس" ]}
    print("Classe of production Q1:", model1.predict(1,t1))
    t2={'جواب':["في النصف الثاني من القرن 7 الميلادي" ]}
    print("Classe of production Q2:", model2.predict(2,t2))
    t3={'جواب':["أكادير" ]}
    print("Classe of production Q3:", model3.predict(3,t3))
    t4={'جواب':["الملك الراحل الحسن ٢ هو   الحاكم الذي ينسب إليه حكم المغرب" ]}
    print("Classe of production Q4:", model4.predict(4,t4))
    t5={'جواب':["أمير المسلمين أبو يعقوب يوسف بن تاشفين بن إبراهيم اللمتوني الصنهاجي (400 - 500 هـ / 1009 - 1106 م) قائد وأمير مسلم وَحَّد المغرب وضم الأندلس تحت مُلكه وسلطته. تولى إمارة دولة المرابطين بعد أن تنازل له ابن عمه الأمير أبو بكر بن عمر اللمتوني عن الملك، واستطاع إنشاء دولة إسلامية تمتد من بجاية شرقًا إلى المحيط الأطلسي غربًا، وما بين البحر المتوسط شمالًا حتى السودان جنوبًا" ]}
    print("Classe of production Q5:", model5.predict(5,t5))
    t6={'جواب':["محمد الخامس، السلطان السابع عشر لسلالة العلويين، تولى الحكم كملك للمغرب بعد الاستقلال  " ]}
    print("Classe of production Q6:", model6.predict(6,t6))
    t7={'جواب':["الحكام الإدريسيون" ]}
    print("Classe of production Q7:", model7.predict(7,t7))
    t8={'جواب':["الرباط عاصمة المملكة في حقبة الحماية الفرنسية" ]}
    print("Classe of production Q8:", model8.predict(8,t8))
    t9={'جواب':[" 1956" ]}
    print("Classe of production Q9:", model9.predict(9,t9))





