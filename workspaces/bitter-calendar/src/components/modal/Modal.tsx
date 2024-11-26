import React from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import Button from '../../ui/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    useBackdrop?: boolean;  
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
}
const ModalWrapper = styled.div<{ useBackdrop?: boolean }> `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;
border: 1px solid var(--main-color);
z-index: 1000;
${({ useBackdrop }) => useBackdrop && `
    backdrop-filter: blur(10px);
`}
`;

const ModalContent = styled.div`
background: white;
padding: 20px;
border-radius: 8px;
min-width: 300px;
max-width: 500px;
max-height: 80vh;
overflow-y: auto;
`;

const ModalHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`;

const ModalBody = styled.div`
margin-bottom: 20px;
`;

const ModalFooter = styled.div`
display: flex;
justify-content: flex-end;
gap: 10px;
`;

const CloseButton = styled.button`
background: none;
border: none;
cursor: pointer;
font-size: 20px;
`;

export default function Modal({ isOpen, onClose, header, content, footer, children }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);


    const onModalClose = () => {
        onClose();
    };

    return createPortal(
        isOpen && (
            <ModalWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                    onModalClose();
                }
            }}>
                <ModalContent ref={modalRef}>
                    <ModalHeader>
                        {header}
                        <CloseButton onClick={onModalClose}>&times;</CloseButton>
                    </ModalHeader>
                    <ModalBody>
                        {content || children}
                    </ModalBody>
                    <ModalFooter>
                        {footer || (
                            <>
                                <Button onClick={onClose}>취소</Button>
                                <Button onClick={onClose}>확인</Button>
                            </>
                        )}
                    </ModalFooter>
                </ModalContent>
            </ModalWrapper>
        ),
        document.body
    );
}
