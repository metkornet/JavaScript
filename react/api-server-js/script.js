class GameOfThronesService{
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok){
            throw new Error(`Couldn't fetch url, status: ${res.status}`);
        }
    
        return await res.json();
    };

    getAllCharacters(){
        return this.getResource('/characters?page=5&pageSize=10');
    }

    getCharacterById(id){
        return this.getResource(`/characters/${id}`);    
    }
}

const got = new GameOfThronesService();
got.getAllCharacters()
    .then(res => (res.forEach(item => console.log(item.name))));

got.getCharacterById(46)
    .then(res => console.log(res));



