// Test that Jest is working

describe('Smoke Test', () => {
    it('should append two strings together', () => {
        expect('hello' + ' world').toBe('hello world');
        expect('oops... my ' + 'bad!').toBe('oops... my bad!');
        expect('think ' + ' different').toBe('think  different');
        expect('sleep is ' + 'such a ' + 'great activity').toBe('sleep is such a great activity');
    });
});