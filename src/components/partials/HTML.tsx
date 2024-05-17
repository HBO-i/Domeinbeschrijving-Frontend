import { FunctionComponent } from "react";

const HTML: FunctionComponent<{ html: string }> = (props) => {

    return (
        <div dangerouslySetInnerHTML={{ __html: props.html }} />
    );
};

export default HTML;