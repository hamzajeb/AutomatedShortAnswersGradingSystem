from num2words import num2words
import re
import string
import nltk
from nltk.stem.isri import ISRIStemmer

stemmer = ISRIStemmer()


#Question 1
def verifyQuestion1(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("محمد سادس") != -1 or phrase_sans_al.find("محمد 6") != -1 or phrase_sans_al.find("محمد ٦") != -1:
        return True
    return False

#Question 2
def verifyQuestion2Help(stemmed_tokens):
    for racine in stemmed_tokens:
        if racine=='عشر' or racine =='ثلث' or racine =='ربع'or racine =='خمس' or racine =='ستن'or racine =='سبع'or racine =='ثمن'or racine =='تسع':
            return False
    return True

def verifyQuestion2(phrase):
    regex = r"\d+"
    numbers = re.findall(regex, phrase)
    if len(numbers)==1:
        for number in numbers:
            if num2words(number)=='seven' or num2words(number)=='eight':
                return True 
    i=0
    if len(numbers)==2:
        for number in numbers:
            if num2words(number)=='seven' or num2words(number)=='eight':
                i=i+1
    if i==2 :
        return True
    phrase = re.sub('\[.*?\]', '', phrase) 
    phrase = re.sub('\(.*?\)', '', phrase) 
    phrase = re.sub('[%s]' % re.escape(string.punctuation), '', phrase) 
    phrase = re.sub('[‘’“”«»…]', '', phrase) 
    phrase = re.sub("-_،؟ ً َّ ًّ ّ ٌّ َ ً ُ ٌ ٍ ِ ْ ٍّ ِّ", '', phrase) 
    phrase = re.sub('\n', '', phrase) 
    phrase = re.sub('[أإآا]', 'ا', phrase)
    phrase = re.sub('[ىي]', 'ي', phrase)
    phrase = re.sub('[ؤئ]', 'ء', phrase)
    tokens = nltk.word_tokenize(phrase)
    stemmed_tokens = [stemmer.stem(word) for word in tokens]
    for racine in stemmed_tokens:
        if racine =='سبع' or racine =='ثمن':
            if verifyQuestion2Help(stemmed_tokens):
                for number in numbers:
                    if num2words(number)!='seven' or num2words(number)!='eight':
                        return False
                return True        
    return False
#Question 3
def verifyQuestion3(phrase):
    if phrase.find("أكادير") != -1 :
        return True
    return False

#Question 4
def verifyQuestion4(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("حسن ثاني") != -1 or phrase_sans_al.find("حسن 2") != -1 or phrase_sans_al.find("حسن ٢") != -1:
        return True
    return False

#Question 5
def verifyQuestion5(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("يوسف بن تاشفين") != -1 or phrase_sans_al.find("يوسف ابن تاشفين") != -1 or phrase_sans_al.find("يوسف تاشفيني") != -1:
        return True
    return False


#Question 6
def verifyQuestion6(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("محمد خامس") != -1 or phrase_sans_al.find("محمد 5") != -1 or phrase_sans_al.find("محمد ٥") != -1:

        return True
    return False

#Question 7
def verifyQuestion7(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("سلالة إدريسية") != -1 or phrase_sans_al.find("إدريسيون") != -1 or phrase_sans_al.find("أدارسة") != -1 or phrase_sans_al.find("إدريسين") != -1:
        return True
    return False

#Question 8
def verifyQuestion8(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)
    if phrase_sans_al.find("رباط") != -1 :
        return True
    return False

#Question 9
def verifyQuestion9(phrase):
    mots_arabes = phrase.split()
    mots_sans_al = []
    for mot in mots_arabes:
        mot_sans_al = re.sub("^ال", "", mot)
        mots_sans_al.append(mot_sans_al)
    phrase_sans_al = " ".join(mots_sans_al)

    
    if phrase_sans_al.find("1956") != -1 or phrase_sans_al.find("ألف وتسع مئة وستة وخمسون") != -1 or phrase_sans_al.find("خمسينات") != -1 or phrase_sans_al.find("56") != -1 :
        return True
    return False





















