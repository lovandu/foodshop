import {
    PRODUCT_LOADED_SUCCESS,
    PRODUCT_LOADED_FAIL,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    FIND_PRODUCT,
    FILTER_PRODUCT,
} from '../contexts/constants';

export const productReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_PRODUCT:
            return {
                ...state,
                product: payload,
            };
        case PRODUCT_LOADED_SUCCESS:
            return {
                ...state,
                products: payload,
                productLoading: false,
            };
        case PRODUCT_LOADED_FAIL:
            return {
                ...state,
                products: [],
                productLoading: false,
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload],
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product._id !== payload,
                ),
            };
        case FILTER_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.category !== payload,
                ),
            };

        case UPDATE_PRODUCT:
            const newProducts = state.products.map((product) =>
                product._id === payload._id ? payload : product,
            );

            return {
                ...state,
                products: newProducts,
            };

        default:
            return state;
    }
};
