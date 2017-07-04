import React from 'react';
import Number from '../../../../src/components/Number/Number';

const NewRelicErrors = () => <Number title="Transaction Errors" key="newRelicErrors" />;

export default NewRelicErrors;

// Note: PureNewRelicErrors is NewRelicErrors without redux (for unit tests)
export { NewRelicErrors as PureNewRelicErrors };
