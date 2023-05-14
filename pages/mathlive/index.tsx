import { useState } from 'react';
import { createPortal } from 'react-dom';

import MathEditor from '../../components/Mathlive';
import Modal from '../../components/Modal';

import '../../styles/globals.css'

const MathliveTestPage = () => {
  const [value, setValue] = useState<string>('');
  const [latex, setLatex] = useState<string>('');
  const [answer, setAnswer] = useState<boolean | null>(null);
  // const formula = "f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \, d\xi";
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAnswer = () => {
    if (latex === value) {
      setAnswer(true);
      setShowModal(true);
    } else {
      setAnswer(false);
      setShowModal(true);
    }
  };

  return (
    <main>
      <h1>Hello</h1>
      <button onClick={handleAnswer} >
        Check answer
      </button>
      <textarea onChange={(e) => setLatex(e.target.value)}/>
      <div>This value comes from MathEditor onChange event:</div>
      <div>{value}</div>
      <div>This value comes from textarea:</div>
      <div>{latex}</div>
      <MathEditor value={latex} onChange={setValue} />
      <div className='test-div'>
      {showModal && createPortal(
        <Modal setShowModal={setShowModal} answer={answer} />,
        document.body
      )}
      </div>
    </main>
  );
};

export default MathliveTestPage;