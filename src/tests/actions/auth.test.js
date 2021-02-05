import { login, logout } from '../../actions/auth';

test('should return login action object', () => {
    const userId = '123abc';
    const action = login(userId);
    expect(action).toEqual({
        type: 'LOGIN',
        userId
    })
});

test('should return logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    })
});