import { createContext, ReactNode, useState, useEffect } from 'react';
import { ModalState } from '../types/ContextTypes';

type UIContextVal = {
  windowWidth: number;
  windowSize: string;
  modals: ModalState;
  selectedStatus: string;
  toggleModal: (modalName: keyof ModalState) => void;
  closeModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
  handleClickOnStatusSelector: (text: string) => void;
};

type ContextType = {
  children: ReactNode;
};

const UIContext = createContext<UIContextVal | undefined>(undefined);

export const UIContextProvider: React.FC<ContextType> = ({ children }) => {
  const [modals, setModals] = useState({
    filterModal: false,
    categoryModal: false,
    statusModal: false,
    sidebar: false,
    deleteModal: false
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowSize, setWindowSize] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('In-Progress');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setWindowSize('mobile');
    } else if (windowWidth < 1280) {
      setWindowSize('tablet');
    } else {
      setWindowSize('desktop');
    }
  }, [windowWidth]);

  useEffect(() => {
    if (windowSize !== 'mobile') {
      setModals((prev) => ({ ...prev, sidebar: false }));
    }
  }, [windowSize]);

  const toggleModal = (modalName: keyof ModalState) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const closeModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const openModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const handleClickOnStatusSelector = (text: string) => {
    setSelectedStatus(text);
  };

  const UIContextVal = {
    // states
    windowWidth: windowWidth,
    windowSize: windowSize,
    modals: modals,
    selectedStatus: selectedStatus,
    // functions
    toggleModal: toggleModal,
    closeModal: closeModal,
    openModal: openModal,
    handleClickOnStatusSelector: handleClickOnStatusSelector
  };

  return (
    <UIContext.Provider value={UIContextVal}>{children}</UIContext.Provider>
  );
};

export default UIContext;
