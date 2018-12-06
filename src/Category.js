import React, {Component, Fragment} from 'react';
import CatItem from "./CatItem";

export default class Category extends Component {
    state = {
        isOpen: true
    }
    toggleGeneration = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen
        }))
    }
    render(){
        const {title, cats} = this.props;
        return (<Fragment>
                <tr key={title} onClick={this.toggleGeneration} className="category-title">
                    <td className="generation" colSpan={3}>
                        {title}
                    </td>
                </tr>
                <CatItem cats={cats} isGenerationOpen={this.state.isOpen}/>
            </Fragment>
        )
    }
}


