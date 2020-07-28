import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import axios from 'axios';
const CREATE_CLOTHES = 'wardrobe/CREATE_CLOTHES';
const REMOVE_CLOTHES = 'wardrobe/REMOVE_CLOTHES';
const SET_CLOTHES = 'wardrobe/SET_CLOTHES';
const SET_TEMPORARY_CLOTHING = 'wardrobe/SET_TEMPORARY_CLOTHING';
const POST_ADDITEM = 'wardrobe/POST_ADDITEM';
const POST_UPDATEITEM = 'wardrobe/POST_UPDATEITEM';
const POST_DELETEITEM = 'wardrobe/POST_DELETEITEM';

const dog1 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjY4XAol3KxWGXJLUG3SwILG-M7NeyoxPbOA&usqp=CAU'
const dog2 = 'https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp'
const dog3 = 'https://www.thesprucepets.com/thmb/kV_cfc9P4QWe-klxZ8y--awxvY4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/adorable-white-pomeranian-puppy-spitz-921029690-5c8be25d46e0fb000172effe.jpg'




export const initialState = Map({
    clothing: List([
        Map({
            item_id: 18,
            image: dog1,
            category: Map({
                categoryValue: 'clothing',
                clothing: false,
                Shoes: false,
                Accessories: false
            }),
            type: Map({
                typeValue: null,
                top: false,
                bottom: false,
                outer: false,
                dress: false
            }),
            buydate: null,
            price: null,
            brand: null,
            storage: null,
            season: Map({
                seasonArray: List([null, null, null, null]),
                spring: false,
                summer: false,
                fall: false,
                winter: false
            })
        }),
    ]),
    shoes: List([
        Map({
            item_id: 31,
            image: dog2,
            category: Map({
                categoryValue: 'shoes',
                clothing: false,
                Shoes: false,
                Accessories: false
            }),
            type: Map({
                typeValue: null,
                sneakers: false,
                leather: false,
                other: false
            }),
            buydate: null,
            price: null,
            brand: null,
            storage: null,
            season: Map({
                seasonArray: List([null, null, null, null]),
                spring: false,
                summer: false,
                fall: false,
                winter: false
            })
        }),
    ]),
    accessories: List([
        Map({
            item_id: 56,
            image: dog3,
            category: Map({
                categoryValue: 'accessories',
                clothing: false,
                Shoes: false,
                Accessories: false
            }),
            type: Map({
                typeValue: null,
                bag: false,
                head: false,
                other: false,
            }),
            buydate: null,
            price: null,
            brand: null,
            storage: null,
            season: Map({
                seasonArray: List([null, null, null, null]),
                spring: false,
                summer: false,
                fall: false,
                winter: false
            })
        }),
    ]),
    temporaryClothing: Map({
        item_id: null,
        image: null,
        category: Map({
            categoryValue: null,
            clothing: false,
            Shoes: false,
            Accessories: false
        }),
        type: Map({
            typeValue: null,
            top: false,
            bottom: false,
            outer: false,
            dress: false
        }),
        buydate: null,
        price: null,
        brand: null,
        storage: null,
        season: Map({
            seasonArray: List([null, null, null, null]),
            spring: false,
            summer: false,
            fall: false,
            winter: false
        })
    })

})

// 액션 생성자
// 해당 액션상성자가 어떤 parameter 를 받아야 하는지 주석으로 적음 
function getAddPostAPI(sendingClothingToServer) {

    const url = 'http://13.125.237.84:5000/item'
    const token = sendingClothingToServer.token;
    const item = sendingClothingToServer.item.toJS();
    const data = {
        weather: item.season.seasonArray, image: item.image, type: item.type.typeValue,
        category: item.category.categoryValue, buydate: item.buydate, price: item.price,
        brand: item.brand, storage: item.storage,
    }
    const config = { headers: { token: token } }
    return axios.post(url, data, config)
}

function getUpdatePostAPI(sendingClothingToServer) {

    const item = sendingClothingToServer.item.toJS();
    const id = item.item_id;
    const url = `http://13.125.237.84:5000/item/:${id}`
    const token = sendingClothingToServer.token;


    const data = {
        weather: item.season.seasonArray, image: item.image, type: item.type.typeValue,
        category: item.category.categoryValue, buydate: item.buydate, price: item.price,
        brand: item.brand, storage: item.storage,
    }
    const config = { headers: { token: token } }
    return axios.post(url, data, config)
    /* 
        const url = `http://13.125.237.84:5000/item/:${item_id}`
        const data = {
            weather: null, image: null, type: null,
            category: null, buydate: null, price: null,
            brand: null, storage: null,
        }
        const config = { headers: { token: 'tokenString' } }
        return axios.post(url, data, config) */
}

function getDeletePostAPI(deletingClothingToServer) {

    const item = deletingClothingToServer.item.toJS();
    const id = item.item_id;
    const url = `http://13.125.237.84:5000/item/:${id}`
    const token = deletingClothingToServer.token;


    const config = { headers: { token: token } }
    return axios.post(url, null, config);

    /*   const url = `http://13.125.237.84:5000/item/:${item_id}`
      const data = null;
      const config = { headers: { token: 'tokenString' } }
      return axios.post(url, data, config) */
}

export const createClothes = createAction(CREATE_CLOTHES);
export const removeClothes = createAction(REMOVE_CLOTHES);
export const setClothes = createAction(SET_CLOTHES); // {index:4,clothes:{item_id:43,image:'sfsdf',type:null....}}
export const setTemporaryClothing = createAction(SET_TEMPORARY_CLOTHING) // {item_id:43,image:'sfsdf',type:null....}}


// sendingClothingToServer={token:AsyncStorage.getItem('TOKEN'),item:temporaryClothing}
export const createClothesToServer = (sendingClothingToServer) => ({

    type: POST_ADDITEM,
    async payload() {
        const { item_id } = await getAddPostAPI(sendingClothingToServer);
        return sendingClothingToServer.item.set('item_id', item_id);
    }
})
// sendingClothingToServer={token:AsyncStorage.getItem('TOKEN'),item:temporaryClothing}
export const updateClothesToServer = (sendingClothingToServer) => ({

    type: POST_UPDATEITEM,
    async payload() {

        await getUpdatePostAPI(sendingClothingToServer);
        return sendingClothingToServer;
    }
})
// sendingClothingToServer={index:index,token:AsyncStorage.getItem('TOKEN'),item:temporaryClothing}
export const deleteClothesToServer = (deletingClothingToServer) => ({

    type: POST_DELETEITEM,
    async payload() {

        await getDeletePostAPI(deletingClothingToServer);
        return deletingClothingToServer;
    }
})

// 우리의 액션타입에는 접두사가 들어가있기 때문에 그냥 CREATE: 를 하면 안되고, [CREATE]: 로 해주어야합니다.

export default handleActions({

    /* 
    THINK 
    
    서버 관련된 처리를 REDUX 전에 처리해야 함 추가,수정,삭제 전부 
    */
    [CREATE_CLOTHES]: (state, action) => {
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');

        // THINK: 의류에 대한 정보를 등록한 후 저장하기 버튼을 누르면 서버에 post 요청을 보내고
        // 이후 응답으로 받은 id 를 받아서 argument 로 넘긴다.
        // newClothing -> ID 가 있는 상태 
        const newClothing = action.payload;
        const category = newClothing.get('category').get('categoryValue');


        if (category === 'clothing') {
            return state.set('clothing', clothing.push(newClothing))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.push(newClothing))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.push(newClothing))
        }
        /* 
        TODO: 
        newClothing 에서 CATEGORY 를 확인하여 해당 CATEGORY 키에 PUSH 한다. 
 
        1> payload 에 category 를 같이 보낸다. 
 
        2> 
        */
        /* ex> createClothes({item_id:45,image:dfds,type:top,category:clothes....}) 
            argument 로 설정한 값이 payload key 안에 들어간다. 
            action.payload = {item_id:45,image:dfds,type:top,category:clothes....}
         */

    },
    /* THINK
    
    삭제할려면 POP 이 아니라 특정 INDEX 에 있는 항목을 삭제해야 함 
    
    CLOTHES 각 객체가 가지고 있는 ITEM_ID 를 가지고 전체 CLOTHES 배열에서 검색하여 
    해당 객체의 배열 내 INDEX 를 찾고 SPLICE 로 해당 객체를 배열에서 제거한다. 
    
     */
    [REMOVE_CLOTHES]: (state, action) => {

        /* THINK 
        PAYLOAD 로 INDEX 를 받아야 함 
        아이템 추가 처럼 카테고리 값에 따라 SPLICE 한것을 STATE 에 반영하면 됨 
        */
        const index = action.payload.index;
        const item = action.payload.item;
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');
        const category = item.get('category').get('categoryValue');
        if (category === 'clothing') {
            return state.set('clothing', clothing.splice(index, 1))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.splice(index, 1))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.splice(index, 1))
        }
    },

    /* THINK

수정하려면  특정 INDEX 에 있는 항목을 수정해야 함 
의류들은 신발, 악세서리, 티셔츠 등으로 나눠져 관리 되기 때문에 
INDEX 를 argument 로 보내는 건 의미가 없음 
CLOTHES 각 객체가 가지고 있는 ITEM_ID 를 가지고 전체 CLOTHES 배열에서 검색하여 
해당 객체의 배열 내 INDEX 를 찾고 SPLICE 로 해당 객체를 배열에서 제거한다. 

 */
    [SET_CLOTHES]: (state, action) => {

        /* THINK: payload= {index:3,clothes:{item_id:43,image:'sfsdf',type:null....}} 
            의류정보가 담긴 객체로 덮어 씌움  
        */
        const index = action.payload.index;
        const item = action.payload.item;
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');
        const category = item.get('category').get('categoryValue');


        /* 
        TODO
        카테고리를 변경하면 원래 있었던 카테고리에서 삭제되어야 함 

        */
        if (category === 'clothing') {
            return state.set('clothing', clothing.set(index, item))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.set(index, item))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.set(index, item))
        }

    },

    [SET_TEMPORARY_CLOTHING]: (state, action) => {

        // payload = {item_id:43,image:'sfsdf',type:null....}
        const temporaryClothing = action.payload;
        return state.set('temporaryClothing', temporaryClothing)

    },


    [`${POST_ADDITEM}_PENDING`]: (state, action) => {
        /* 
        BUG 
        
        PENDING 일때 기존 STATE 를 그대로 리턴해야함 
        
         { state } 로 리턴하고 있었음.. 
        */
        return state

    },
    [`${POST_ADDITEM}_FULFILLED`]: (state, action) => {
        console.log('_FULFILLED', state.toJS())
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');

        // THINK: 의류에 대한 정보를 등록한 후 저장하기 버튼을 누르면 서버에 post 요청을 보내고
        // 이후 응답으로 받은 id 를 받아서 argument 로 넘긴다.
        // newClothing -> ID 가 있는 상태 
        const newClothing = action.payload;

        console.log('action.payload', action.payload)
        const category = newClothing.get('category').get('categoryValue');


        if (category === 'clothing') {
            return state.set('clothing', clothing.push(newClothing))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.push(newClothing))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.push(newClothing))
        }

    },

    [`${POST_ADDITEM}_REJECTED`]: (state, action) => {
        return state
    },


    [`${POST_UPDATEITEM}_PENDING`]: (state, action) => {
        /* 
        BUG 
        
        PENDING 일때 기존 STATE 를 그대로 리턴해야함 
        
        { state } 로 리턴하고 있었음.. 
        */
        return state

    },
    [`${POST_UPDATEITEM}_FULFILLED`]: (state, action) => {


        const index = action.payload.index;
        const item = action.payload.item;
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');
        const category = item.get('category').get('categoryValue');


        /* 
        TODO
        카테고리를 변경하면 원래 있었던 카테고리에서 삭제되어야 함 

        */
        if (category === 'clothing') {
            return state.set('clothing', clothing.set(index, item))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.set(index, item))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.set(index, item))
        }

    },

    [`${POST_UPDATEITEM}_REJECTED`]: (state, action) => {
        return state
    },

    [`${POST_DELETEITEM}_PENDING`]: (state, action) => {
        /* 
        BUG 
        
        PENDING 일때 기존 STATE 를 그대로 리턴해야함 
        
        { state } 로 리턴하고 있었음.. 
        */
        return state

    },
    [`${POST_DELETEITEM}_FULFILLED`]: (state, action) => {


        const index = action.payload.index;
        const item = action.payload.item;
        const clothing = state.get('clothing');
        const shoes = state.get('shoes');
        const accessories = state.get('accessories');
        const category = item.get('category').get('categoryValue');
        if (category === 'clothing') {
            return state.set('clothing', clothing.splice(index, 1))
        }

        else if (category === 'shoes') {
            return state.set('shoes', shoes.splice(index, 1))
        }

        else if (category === 'accessories') {
            return state.set('accessories', accessories.splice(index, 1))
        }

    },

    [`${POST_DELETEITEM}_REJECTED`]: (state, action) => {
        return state
    },
}, initialState);



