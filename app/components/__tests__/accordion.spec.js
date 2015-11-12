const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');
const expect = require('expect');
const jasmineReact = require('jasmine-react-helpers');
const rewireJasmine = require('../../__tests__/rewire-jasmine');
import Accordion from '../Accordion.js';
import AccordionItem from '../AccordionItem.js';


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


describe('Accordion', function () {

    //it('监听函数被调用', function () {
    //    jasmineReact.spyOnClass(Accordion, 'handleChanged');
    //    const accordionComponent = TestUtils.renderIntoDocument(<Accordion autoToggle={true} data={accordionData}/>);
    //    const accordionItemComponent = TestUtils.findRenderedComponentWithType(accordionComponent, AccordionItem);
    //    accordionItemComponent.handleAccordionItemClick();
    //    expect(jasmineReact.classPrototype(Accordion).handleChanged).toHaveBeenCalled();
    //    expect(accordionComponent.props.autoToggle).toBe(true);
    //
    //});
});



describe("HelloWorld", function () {
    it("should call plop method on render", function(){

        var Comp = React.createClass({

            displayName: "Comp",

            plop: function() {
                console.log("plop");
            },

            render: function() {
                this.plop();
                return (<div></div>);
            }
        });

        //spy on method
        jasmineReact.spyOnClass(Comp, 'plop');
        jasmineReact.render(<Comp />);
        expect(jasmineReact.classPrototype(Comp).plop).toHaveBeenCalled();
    })
});
