export function studentsReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_STUDENT':
            return [...state, {
                name: action.student.name,
                email: action.student.email,
                password: action.student.password,
                phone: action.student.phone,
                gender: action.student.gender,
                address: action.student.address
            }];
        default:
            return state;
    }
}
