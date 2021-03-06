import React, {Component} from 'react';
//import styled from 'styled-components'
//import ScrollArea from "react-scrollbar";
import moment from "moment";


export default class YearList extends Component {
    componentDidMount() {
        const content = this.scrollRef;
        const current = content.children[this.currentId];
        content.scrollTop = current.offsetTop - (content.clientHeight - current.offsetHeight)/2;
    }
    currentId = 0;
    onChange = (i, e) => {
        this.props.onChange(i);
        e.stopPropagation();
    }
    renderYearItem = (i, n) => {
        const p = this.props;
        let itemClass = 's-option';
        let onClick = this.onChange.bind(this, i);
        if(i.isSame(this.props.selected, 'year')){
            itemClass += ' i-current';
            this.currentId = n
        }
        if(p.disabled
            || (p.min && i.isBefore(p.min, 'year'))
            || (p.max && i.isAfter(p.max, 'year'))
        ){
            itemClass += ' i-disabled';
            onClick = null;
        }
        return (
            <div key={n} className={itemClass}
                 onClick={onClick}>
                {i.format('YYYY')}
            </div>
        )
    }

    render() {
        const p = this.props;
        const years = [];
        for (let i = p.selected.year() - 50; i<p.selected.year() + 50;i++){
            years.push(moment(p.selected).year(i))
        }

        return (

            <div className="f-l-scrolling h-years"
                        ref={e => {this.scrollRef = e}}>
                {years.map(this.renderYearItem)}
            </div>
        )
    }
}