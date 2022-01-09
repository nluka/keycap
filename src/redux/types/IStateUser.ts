export default interface IStateUser {
  isSignedIn: boolean;
  token: string | null;
  name: string | null;
}
