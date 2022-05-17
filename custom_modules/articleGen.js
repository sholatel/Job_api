//function for generating an article (a or an) for sentences
/* 
    ***Takes 1 parameter:***
    the paramete is the word we want to generate 
    article for
    
    ***Vowel letters uses an***
    a,i,o,u and e

*/
//vowel letters are

const vowelSounds=['a','e','i','o','u']

const genArticle = (word)=> {
    let article='A'
    let nwWord=String(word).toLowerCase()
    //loops through to match the if word starts with one of the vowel sounds  
    vowelSounds.map(alp=> {
         
        if (nwWord.at(0)===alp)  {
            article='An'
        }
        return ''
    })
    
    return article
}

module.exports =genArticle