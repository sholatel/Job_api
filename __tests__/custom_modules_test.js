const genArticle= require('../custom_modules/articleGen')

describe ('Test for api custom modules', ()=>{

    it('A or An should be returned based on the letter that start the word argument', ()=> {
        const word='Engineer'
        const article=genArticle(word)
        console.log(article)
        expect(article).toBe ('An')
    })

})
