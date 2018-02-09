/* Tooltip on Hover
------------------------------------------------------------------------*/

var tooltip = document.querySelectorAll('.coupontooltip');

document.addEventListener('mousemove', fn, false);

function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}

/* Drag-and-Drop Stuff
------------------------------------------------------------------------*/

let element = document.getElementsByClassName('dropzone'),
    x = 0,
    y = 0;

// initialize equipped bools
let isEquipped = {
    head:       false,
    chest:      false,
    weapon:     false,
    accessory:  false
}

// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "#overlay",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function(event) {

            // TODO: When we finally drop our box, check if valid placement

        }
    })
    .on('dragmove', function(event) {
        x += event.dx;
        y += event.dy;

        event.target.style.webkitTransform =
            event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: [
        '#helmet',
        '#weapon',
        '#accessory',
        '#chest'
    ],
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.85,

    // listen for drop related events:
    ondropactivate: function(event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function(event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');

        // Checks if it's a valid item for this slot.
        // We would probably implement some functions here that
        // add to our character's global stats.
        if (dropzoneElement.classList.contains(draggableElement.classList.item(2))) {
          draggableElement.classList.add('can-drop');
          // Get the value for classlist.item
          // find input related to item (hidden)
          // updae value in that input

        } else {
          draggableElement.classList.add('can-not-drop');
        }

        draggableElement.textContent = 'Dragged in';
    },
    ondragleave: function(event) {
        // remove the drop feedback style
        let element = event.relatedTarget;
        let dropzoneElement = event.target;

        isEquipped[element.classList.item(2)] = false;

        dropzoneElement.classList.remove('drop-target');
        element.classList.remove('can-drop');
        element.classList.remove('can-not-drop');

        element.textContent = 'Dragged out';
    },
    ondrop: function(event) {

        let dropzoneElement = event.target;
        let element = event.relatedTarget;

        // Lets check if this is a valid drop zone
        if (dropzoneElement.classList.contains(element.classList.item(2))
            && !isEquipped[element.classList.item(2)]) {

            element.textContent = 'Dropped';
            isEquipped[element.classList.item(2)] = true;

            console.log(element.classList.item(2) + ": " + isEquipped[element.classList.item(2)]);

        } else {

            // Remove our 'no-drop' indicator (red background)
            event.relatedTarget.classList.remove('can-not-drop');
            event.relatedTarget.classList.remove('can-drop');

            // Removes the initial transform/translation of the item
            element.style.transform = 'none';

            // But moving an item puts a 'data-x' and 'data-y' attribute on the
            // element which we need to remove as well.
            element.removeAttribute("data-x");
            element.removeAttribute("data-y");

        }
    },
    ondropdeactivate: function(event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});
