class Square extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            items: typs['trips'],
            colors: barvy,
        };
        if (window.location.hash.startsWith('#config')) {
            console.log(window.location);
            this.state.items = JSON.parse(window.location.hash.slice(8).replace(/'/g, '"'))
            // console.log(this.state.items);
            // window.location.hash = ''
        }

        this.updatemodel();
    }

    componentDidMount() {

        this.createslider()
    }

    updatemodel() {
        console.log('ubdate by', this.state.items);

        window.location.hash = this.getConfStr();
        updateColors(this.state.items);
    }

    // changenum(i, val) {
    //     let items = this.state.items;
    //     items[i][0] = val;
    //     this.setState({items: items});
    //
    //     this.updatemodel()
    //     this.createslider()
    //
    // }

    changecolor(i, val) {
        let items = this.state.items;
        items[i][1] = val;
        this.setState({items: items});

        this.updatemodel()
        this.createslider()
    }

    getConfStr() {
        return 'config=' + JSON.stringify(this.state.items).replace(/"/g, "'");
    }

    render() {
        let {items, colors} = this.state;

        let confstr = window.origin + '#' + this.getConfStr();


        return (
            <div>
                <div style={{height: '500px'}}>

                    {
                        items.slice(0).reverse().map((item, index) =>
                            <div style={{padding: 0}} key={items.length - index - 1}>

                                {/*<input value={item[0]} type="number" disabled*/}
                                {/*onChange={(event) => this.changenum(items.length - index - 1, event.target.value)}/>*/}


                                <div style={{
                                    margin: '5px 0',
                                    background: '#CCCCCC',
                                    position: 'absolute',
                                    top: 5 * (100 - item[0])
                                }}>
                                    {
                                        colors.map((color, indexc) =>
                                            <button onClick={ () => this.changecolor(items.length - index - 1, color)}
                                                    key={indexc}
                                                    title={color}
                                                    style={{
                                                        cursor: 'pointer', background: color,
                                                        padding: '8px 10px', margin: '8px',
                                                        border: item[1] == color ? '2px solid black' : '2px solid white'
                                                    }}
                                            />
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>

                Odkaz na aktuální model:<br/>
                <a href={confstr} target="_blank">{confstr} </a>
            </div>
        )
    }


    sliderOptions = {
        range: {
            'min': 0,
            'max': 100
        },
        step: 5,
        start: [20],
        // ... must be at least 300 apart
        margin: 5,
        // connect: [true,true,true, true, true,true,true,true,true],

        // Put '0' at the bottom of the slider
        direction: 'rtl',
        orientation: 'vertical',

        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        // format: wNumb({
        //     decimals: 0
        // }),

        // Show a scale with the slider
        pips: {
            mode: 'steps',
            stepped: true,
            density: 4
        }
    };


    createslider() {
        var range = window.document.getElementById('range');
        console.log('range', range);
        if (range.noUiSlider) {
            range.noUiSlider.destroy();
        }

        let items = this.state.items;
        let self = this;

        let options = this.sliderOptions;
        options.start = items.slice(0, -1).map(i => i[0])
        options.connect = Array(items.length).fill(true)
        noUiSlider.create(range, options);


        var connect = range.querySelectorAll('.noUi-connect');

        for (var i = 0; i < items.length; i++) {
            console.log(connect[i]);
            connect[i].style.background = items[i][1]
        }


        range.noUiSlider.on('change', function (vals) {
            console.log('vals', vals);
            vals.forEach((val, index) => {
                items[index][0] = val;
            })
            items[vals.length][0] = 100
            self.setState({
                items: items
            })

            self.updatemodel()
        })


    }


}


ReactDOM.render(<Square />,
    document.getElementById('reactapp')
);

// initslider();


function initslider() {


}