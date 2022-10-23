class UIButton {
    bgItem;
    textItem;
    group;
    layer;

    constructor(attrs={}) {
        attrs = attrs ? attrs : {};
        const defaults = {
            content: "",
            position: [0, 0],
            size: [100, 50],
            bgColor: '#DAF7A6',
            bgColorHover: '#FFC300',
            bgColorClick: '#FF5733',
            textColor: 'black',
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
            fontSize: '10',
            justification: 'center',
            onMouseEnter: evt => true,
            onMouseLeave: evt => true,
            onMouseMove: evt => true,
            onMouseDown: evt => true,
            onMouseUp: evt => true,
            onMouseDrag: evt => true,
            onClick: evt => true,
        };        
        let attributes = {};
        Object.assign(attributes, attrs);
        Object.keys(defaults).forEach(k => {
            if (k in attributes) {
                return;
            }
            attributes[k] = defaults[k];
        });

        this.layer = project.activeLayer;
        this.bgItem = new Shape.Ellipse({
            point: [0, 0],
            size: attributes.size,
            fillColor: attributes.bgColor,
        });

        this.textItem = new PointText({
            point: [0, 0],
            content: attributes.content,
            fillColor: attributes.textColor,
            fontFamily: attributes.fontFamily,
            fontWeight: attributes.fontWeight,
            fontSize: attributes.fontSize,
            justification: attributes.justification,
        });
        this.textItem.fitBounds(this.bgItem.bounds);
        this.textItem.bringToFront();

        function getBgFillColor(evt) {
            function hover(evt) {
                let hr = evt.target.layer.hitTest(evt.point);
                if (!hr) {
                    return false;
                }
                return hr.item.id == this.textItem.id || hr.item.id == this.bgItem.id;
            }
            if (!hover.bind(this)(evt)) {
                return attributes.bgColor;
            }
            return evt.event.buttons & MOUSE.LEFT ? attributes.bgColorClick : attributes.bgColorHover;
        }
        this.group = new Group({
            children: [this.bgItem, this.textItem],
            position: attributes.position,
            onMouseEnter: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseEnter(evt);
            },
            onMouseLeave: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseLeave(evt);
            },
            onMouseDown: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseDown(evt);
            },
            onMouseMove: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseMove(evt);
            },
            onMouseUp: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseUp(evt);
            },
            onMouseDrag: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onMouseDrag(evt);
            },
            onClick: evt => {
                this.bgItem.fillColor = getBgFillColor.bind(this)(evt);
                attributes.onClick(evt);
            },
        });

        // Object.keys(attributes).forEach(k => {
        //     if (!(k in this.group)) {
        //         return;
        //     }
        //     this.group[k] = attrs[k];
        // })
    }
}