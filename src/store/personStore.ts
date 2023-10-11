import { create } from "zustand";

// Setup initial state
type State = {
  firstName: string;
  lastName: string;
};

// Setup actions
type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
};

// Setup store
export const usePersonStore = create<State & Action>((set) => ({
  firstName: "",
  lastName: "",
  updateFirstName: (firstName) =>
    set(() => {
      console.log("Inside updateFirstName(): ", firstName);
      return { firstName: firstName };
    }),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}));

// call inside the component to display and update values
// const changeFirstName = (firstName: string) => {
//   usePersonStore.getState().updateFirstName(firstName);
// };
//   const firstName = usePersonStore((state) => state.firstName);

