// Package includes
import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { DragDropContext } from "react-beautiful-dnd";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { MdKeyboardBackspace } from 'react-icons/md'

// Additional components
import { 
    DraggableTr, 
    DroppableTbody, 
    UnDroppableTbody, 
    DraggableTrCopy,
} from '../components';

// Utils
import { getTableData, getTableColumns, move } from '../utils';

export default class DndTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            splitView: false,
            data: getTableData(1000),
        };

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {

        if (!result.destination) {
            return;
        }
        
        
        try {
            // Insert row into its new position in array.
            let from = result.source.index,
                to   = result.destination.index,
                data = move(this.state.data, from, to);


            // Update sortOrder
            for (let i = 0; i < data.length; i++) {
                data[i].sortOrder = i+1;
            }

            this.setState({ data });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (   
            <DragDropContext onDragEnd={this.onDragEnd} >
                <Container>
                    <Row>
                        <Col><h1>Course Builder</h1></Col>
                        <Col>
                            <Button style={{ float: 'right'}} variant="primary" onClick={() => this.setState({splitView: !this.state.splitView})}> 
                                {
                                    this.state.splitView ?    
                                        'Turn off split view' :
                                        'Turn on split view'
                                }
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ReactTable
                                style={{height: "600px"}}
                                columns={getTableColumns()}
                                data={this.state.data}
                                TrComponent={DraggableTr}
                                getTrProps={(_, info) => {return {info}}}
                                TbodyComponent={DroppableTbody}
                                className="-highlight"
                            />
                        </Col>
                        { 
                            this.state.splitView && (
                                <React.Fragment>
                                    <Col style={{ paddingTop: '25%' }} md="auto">
                                        <MdKeyboardBackspace ></MdKeyboardBackspace>
                                    </Col>
                                    <Col>
                                        <ReactTable
                                            style={{height: "600px"}}
                                            columns={getTableColumns()}
                                            data={this.state.data}
                                            TrComponent={DraggableTrCopy}
                                            getTrProps={(_, info) => {return {info}}}
                                            TbodyComponent={UnDroppableTbody}
                                            className="-highlight"
                                        />
                                    </Col>
                                </React.Fragment>
                            )
                        }
                    </Row>
                </Container>
            </DragDropContext>
        )
    }
}