import os
import random

DNA = ['A', 'C', 'G', 'T']

# generate random DNA string with specified length
def genDNA(length):
    DNA_str = ''
    for i in range(length):
        DNA_str += DNA[random.randint(0, 3)]
    return DNA_str

# generate random invalid DNA string with specified length
# must in upper case, range A-Z
def genInvalidDNA(length):
    DNA_str = ''
    for i in range(length):
        DNA_str += chr(random.randint(65, 90))
    return DNA_str

# generate random DNA string with specified length and store in a (new) file if not exist
# if file exists, replace the content with new DNA string
def genDNA_file(length, filename):
    if not os.path.exists(filename):
        f = open(filename, 'w')
        f.write(genDNA(length))
        f.close()
    else:
        f = open(filename, 'w')
        f.write(genDNA(length))
        f.close()

# generate any invalid DNA with specified length and store in a (new) file if not exist
# if file exists, replace the content with new DNA string
def genInvalidDNA_file(length, filename):
    if not os.path.exists(filename):
        f = open(filename, 'w')
        f.write(genInvalidDNA(length))
        f.close()
    else:
        f = open(filename, 'w')
        f.write(genInvalidDNA(length))
        f.close()

if __name__ == '__main__':
    # generate 5 test cases for each property:
    # 1. length = 50, valid DNA, store as ValidDiseaseDNA(number).txt
    # 2. length = 50, invalid DNA, store as InvalidDiseaseDNA(number).txt
    # 3. length = 200, valid DNA, store as ValidTestDNA(number).txt
    # 4. length = 200, invalid DNA, store as InvalidTestDNA(number).txt

    # 1. length = 50, valid DNA, store as ValidDiseaseDNA(number).txt
    for i in range(5):
        genDNA_file(50, 'ValidDiseaseDNA' + str(i + 1) + '.txt')

    # 2. length = 50, invalid DNA, store as InvalidDiseaseDNA(number).txt
    for i in range(5):
        genInvalidDNA_file(50, 'InvalidDiseaseDNA' + str(i + 1) + '.txt')

    # 3. length = 200, valid DNA, store as ValidTestDNA(number).txt
    for i in range(5):
        genDNA_file(200, 'ValidTestDNA' + str(i + 1) + '.txt')

    # 4. length = 200, invalid DNA, store as InvalidTestDNA(number).txt
    for i in range(5):
        genInvalidDNA_file(200, 'InvalidTestDNA' + str(i + 1) + '.txt')


