import addStudent from '../src/actions/addStudentAction';
import { studentsReducer } from './../src/reducers/studentsReducer';

describe('post reducer', () => {

    const student = {
        name: 'girish talekar',
        email: 'talekar.g@gmail.com',
        password: '',
        phone: '',
        gender: '',
        address: ''
    };
    const studentAction = addStudent(student);

    it('should return the initial state', () => {
        expect(studentsReducer([], studentAction).length).toBe(1);
    });
});
