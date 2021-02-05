import { login, logout } from '../../actions/auth';
import authReducer from '../../reducers/auth';

test('should set userId in the auth state', () => {
    const userId = '123abc';
    const state = authReducer({}, login(userId));
    expect(state).toEqual({
        userId
    });
});

test('should set auth state to empty object', () => {
    const state = authReducer({userId: '123'}, logout());
    expect(state).toEqual({});
})