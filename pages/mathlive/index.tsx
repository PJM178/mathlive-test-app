import { useState } from 'react';

import MathEditor from '../../components/Mathlive';

const MathliveTestPage = () => {
  const [value, setValue] = useState<string>('');

  return (
    <main>
      <h1>Hello</h1>
      <div>This value comes from MathEditor onChange event:</div>
      <div>{value}</div>
      <MathEditor value={value} onChange={setValue} />
    </main>
  );
};

export default MathliveTestPage;