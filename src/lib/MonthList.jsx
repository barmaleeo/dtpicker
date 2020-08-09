import React, {Component} from 'react';
import styled from 'styled-components'
import ScrollArea from "react-scrollbar";
import moment from "moment";


export default class MonthList extends Component {
    componentDidMount() {
        const content = this.scrollRef.content;
        const current = content.children[this.currentId];
        const parent = content.parentNode;
        parent.scrollTop = current.offsetTop - (parent.clientHeight - current.offsetHeight)/2;
    }
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.scrollRef.content.children[this.currentId].scrollIntoView({block:'center'});
    // }
    currentId = 6;
    renderItem = (i, n) => {
        let itemClass = 's-option';
        if(i.isSame(this.props.selected, 'month')){
            itemClass += ' i-current';
            this.currentId = n;
        }
        return (
            <div key={n} className={itemClass}
                 onClick={e=>{this.setState({selected:i})}}>
                {i.format('MMMM')}
            </div>
        )
    }

    render() {
        const p = this.props;
        const items = [];

        for (let i = 0; i<12;i++){
            items.push(moment(p.selected).month(i))
        }

        return (

            <ScrollArea className="f-l-scrolling h-months"
                        ref={e => {this.scrollRef = e}}>
                {items.map(this.renderItem)}
            </ScrollArea>
        )
    }
}