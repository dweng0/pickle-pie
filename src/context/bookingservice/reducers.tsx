export const updateProposedBooking = (state, action) => {
    switch (action.type) {
        case "update": {
            return {...state, ...action.payload}
        }
    }
}