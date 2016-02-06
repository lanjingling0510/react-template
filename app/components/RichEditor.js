import React, {PropTypes, Component} from 'react';

class RichEditor extends Component {
    static propTypes = {
        tools: PropTypes.array,
    }

    static defaultProps = {
        tools: [
            'fontname',
            'fontsize',
            'forecolor',
            'hilitecolor',
            'bold',
            'italic',
            'underline',
            'removeformat',
            'justify',
            'order',
            'face',
            'image',
            'link',
        ],
    }

    componentDidMount() {
        const {richTools, richIframe} = this.props;
        const doc = this.doc = richIframe.contentDocument ||
                    richIframe.contentWindow.document;

        doc.designMode = 'on';
        doc.write('<html><head><style>body{ margin:3px; word-wrap:break-word; word-break: break-all; }</style></head><body>我是谁呀我是谁呀我是谁呀我是谁呀我是谁呀</body></html>');
        doc.close();
    }

    renderTool = (key) => {
        switch (key) {
            case 'fontname':
                return (
                    <li className="Liz-fl tool" title="字体">
                        <span className="Liz-toolbar-icon Liz-toolbar-icon-url fontname"></span>
                        <div className="dropdown-wrap dropdown-wrap-FamAndSize ani-dropdown-down">
                            <ul>
                                <li><span data-name="字体">宋体</span></li>
                                <li><span data-name="字体">新宋体</span></li>
                                <li><span data-name="字体">仿宋_GB2323</span></li>
                                <li><span data-name="字体">标楷体</span></li>
                                <li><span data-name="字体">黑体</span></li>
                                <li><span data-name="字体">微软雅黑</span></li>
                                <li><span data-name="字体">Arial</span></li>
                                <li><span data-name="字体">Arial Black</span></li>
                                <li><span data-name="字体">Times New Roman</span></li>
                                <li><span data-name="字体">Courier New</span></li>
                                <li><span data-name="字体">Tahoma</span></li>
                                <li><span data-name="字体">Verdana</span></li>
                            </ul>
                        </div>
                    </li>
                );
            case 'fontsize':
                return (
                    <li className="Liz-fl tool" title="文字大小">
                        <span className="Liz-toolbar-icon Liz-toolbar-icon-url fontsize"></span>
                        <div className="dropdown-wrap dropdown-wrap-FamAndSize  ani-dropdown-down">
                            <ul>
                                <li><span data-name="文字大小" value="1">9px</span></li>
                                <li><span data-name="文字大小" value="2">10px</span></li>
                                <li><span data-name="文字大小" value="3">12px</span></li>
                                <li><span data-name="文字大小" value="4">14px</span></li>
                                <li><span data-name="文字大小" value="5">16px</span></li>
                                <li><span data-name="文字大小" value="6">18px</span></li>
                                <li><span data-name="文字大小" value="7">24px</span></li>
                                <li><span data-name="文字大小" value="8">32px</span></li>
                            </ul>
                        </div>
                    </li>
                );
            case 'forecolor':
                return (
                    <li  class="Liz-fl tool" title="字体颜色">
                                        <span class="Liz-toolbar-icon Liz-toolbar-icon-url forecolor"></span>
                                        <div class="dropdown-wrap ani-dropdown-down">
                                        <table class="lz-colorpicker-table" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                        <tr><td colspan="6" class="lz-colorpicker-cell-top" title="无颜色" >无颜色</td></tr>
                                        <tr>
                                        <td class="lz-colorpicker-cell" title="#E53333" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(229, 51, 51);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#E56600" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(229, 102, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#FF9900" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(255, 153, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#64451D" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(100, 69, 29);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#DFC5A4" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(223, 197, 164);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#FFE500" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(255, 229, 0);"></div></td>
                                        </tr>
                                        <tr>
                                        <td class="lz-colorpicker-cell" title="#009900" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(0, 153, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#006600" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(0, 102, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#99BB00" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(153, 187, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#B8D100" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(184, 209, 0);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#60D978" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(96, 217, 120);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#00D5FF" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(0, 213, 255);"></div></td>
                                        </tr>
                                        <tr><td class="lz-colorpicker-cell" title="#337FE5" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(51, 127, 229);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#003399" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(0, 51, 153);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#4C33E5" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(76, 51, 229);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#9933E5" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(153, 51, 229);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#CC33E5" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(204, 51, 229);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#EE33EE" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(238, 51, 238);"></div></td>
                                        </tr>
                                        <tr>
                                        <td class="lz-colorpicker-cell" title="#FFFFFF" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(255, 255, 255);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#CCCCCC" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(204, 204, 204);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#999999" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(153, 153, 153);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#666666" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(102, 102, 102);"></div></td>
                                        <td class="lz-colorpicker-cell" title="#333333" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(51, 51, 51);"></div></td>
                                        <td class="lz-colorpicker-cell lz-colorpicker-cell-selected" title="#000000" ><div data-name="字体颜色"  class="lz-colorpicker-cell-color"  style="background-color: rgb(0, 0, 0);"></div></td>
                                        </tr></tbody></table>
                                        </div>
                                        </li>
                );
            default:

        }
    }

    render() {
        return (
            <div className="Liz-replayBox Liz-clear" >
    			<ul className="Liz-replayBox-tools Liz-clear" ref="richTools">
    			</ul>
    			<iframe className="Liz-replayBox-content" frameBorder="0" tabIndex ref="richIframe">
    			</iframe>
    		</div>
        );
    }
}

export default RichEditor;
