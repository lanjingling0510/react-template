import {jsdom} from 'jsdom';

// init jsdom
global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;


const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const expect = require('expect');
const sinon = require('sinon');

const Accordion = require('../Accordion.js');
const AccordionItem = require('../AccordionItem.js');
import {shallow, mount} from 'enzyme';


const accordionData =
    [
        {
            'title': <span>寻宝</span>,
            'content': (
                <ul className="list-group">
                    <a href="#" className="list-group-item">首页</a>
                    <a href="#" className="list-group-item">场馆介绍</a>
                    <a href="#" className="list-group-item">展会指南管理</a>
                    <a href="#" className="list-group-item">展区导航管理</a>
                </ul>
            ),
            'open': true,
        },
    ];

/* eslint-disable */
describe('Accordion', function () {
    var accordionComponent;
    var accordionItemComponent;

    accordionComponent = ReactTestUtils.renderIntoDocument(
        <Accordion autoToggle={true} data={accordionData}/>
    );
    accordionItemComponent = ReactTestUtils.findRenderedComponentWithType(accordionComponent, AccordionItem);


    it('检测组件的props.autoToggle', function () {
        expect(accordionComponent.props.autoToggle).toBe(true);
    });


    it('should redner one <AccordionItem /> component', () => {
        const wrapper = shallow(<Accordion autoToggle={true} data={accordionData}/>);
        expect(wrapper.find('AccordionItem').length).toEqual(1);
    })

    it('calls componentDidMount', () => {
        sinon.spy(AccordionItem.prototype, 'componentDidMount');
        const wrapper = mount(<Accordion autoToggle={true} data={accordionData}/>);
        expect(AccordionItem.prototype.componentDidMount.calledOnce).toBe(true);
    })
});
