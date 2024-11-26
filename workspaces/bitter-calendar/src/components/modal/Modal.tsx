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
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);  // 그림자 효과 추가
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

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const renderFooterButtons = () => {
        if (footer) return footer;
        
        return (
            <>
                <Button onClick={onClose}>취소</Button>
                <Button onClick={onClose}>확인</Button>
            </>
        );
    };

    const renderModalContent = () => (
        <ModalContent ref={modalRef}>
            <ModalHeader>
                {header}
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
                {content || children}
            </ModalBody>
            <ModalFooter>
                {renderFooterButtons()}
            </ModalFooter>
        </ModalContent>
    );

    return createPortal(
        isOpen && (
            <ModalWrapper onClick={handleBackdropClick}>
                {renderModalContent()}
            </ModalWrapper>
        ),
        document.body
    );
}
