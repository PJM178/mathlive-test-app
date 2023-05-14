import '../styles/Home.module.css';

const Modal = ({ setShowModal, answer }: { setShowModal: (showModal: boolean) => void, answer: boolean | null }) => {
  return (
    <div className="modal-container">
        {answer === true
          ? <div>congratulations, your answer is correct!</div>
          : <div>sorry, that is not a correct answer</div>
        }
        <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  )
}

export default Modal;