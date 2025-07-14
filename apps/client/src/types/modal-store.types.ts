export type ModalSliceType = {
  isOpen: boolean;
  activeModal: 'auth' | 'filter' | null;
  toggleModal: (modal?: 'auth' | 'filter' | null) => void;
};
