import {validEmail, validPhone} from './validation';
describe('input validation',()=>{
  test('accepts international and spaced phone numbers',()=>{expect(validPhone('+91 98765 43210')).toBe(true);});
  test('rejects short phone numbers',()=>{expect(validPhone('12345')).toBe(false);});
  test('accepts basic email addresses',()=>{expect(validEmail('user@example.org')).toBe(true);});
  test('rejects malformed email addresses',()=>{expect(validEmail('not-an-email')).toBe(false);});
});
