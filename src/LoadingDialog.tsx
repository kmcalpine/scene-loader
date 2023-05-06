import { useRef, useEffect } from "react";
import { Modal } from "bootstrap";
import { useExampleStore } from "./store";

const LoadingDialog = () => {
  const modalElementRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<Modal | null>(null);
  const { isLoading } = useExampleStore();

  const onElementReady = (element: HTMLDivElement) => {
    if (modalRef.current === null) {
      const modal = new Modal(element, {
        backdrop: true
      });
      modalRef.current = modal;
    }
  };

  useEffect(() => {
    if (modalRef.current === null) {
      console.error("modal ref not set");
      return;
    }
    if (isLoading) {
      modalRef.current.show();
    } else {
      modalRef.current.hide();
    }
  }, [isLoading]);

  return (
    <div
      ref={(el) => {
        modalElementRef.current = el;
        if (el !== null) {
          onElementReady(el);
        }
      }}
      className="modal fade"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div
            className="alert alert-success d-flex align-items-center p-5 m-5"
            role="alert"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-2">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;
