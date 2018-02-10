/* Tooltip-on-Hover
------------------------------------------------------------------------------*/

var tooltip = document.querySelectorAll('.coupontooltip');

document.addEventListener('mousemove', function(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}, false);

/* Drag-and-Drop Variables
-----------------------------------------------------------------------------*/

let element = document.getElementsByClassName('dropzone'),
    x = 0,
    y = 0;

// Our currently-interacting item and slot.
let draggableElement;
let dropzoneElement;

// Initialize our equipment checks (do we have a weapon, etc.)
let isEquipped = {
    head:       false,
    chest:      false,
    weapon:     false,
    accessory:  false
}

/* Drag-and-Drop Functions
------------------------------------------------------------------------------*/

/**
 * Check to see if an item is valid for the slot it's being hovered/dropped on.
 * @return {Boolean} Is item in right spot
 */
function isValidItem(draggable, dropzone) {
    return dropzone.classList.contains(draggable.classList.item(2));
}

/**
 * Remove color formatting from item.
 * @param  {[type]} draggable currently interactive item
 */
function itemRemoveColor(draggable) {
    // Remove the color classes currently attached to our item
    draggable.classList.remove('can-drop');
    draggable.classList.remove('can-not-drop');
}

/**
 * Reset the position (remove translation) of the item
 * @param  {[type]} draggable currently interactive item
 */
function itemRemoveTranslation(draggable) {
    draggable.style.transform = 'none';
    draggable.removeAttribute("data-x");
    draggable.removeAttribute("data-y");
}

/**
 * Reset the color and position of an item back to it's origin.
 * @param {[type]} draggable the item we're resetting.
 */
function itemReset(draggable) {
    itemRemoveColor(draggable);
    itemRemoveTranslation(draggable);
}

/* Interact.js Implementation and Listeners
------------------------------------------------------------------------------*/

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
            // TODO: implement action for when drag and drop has ended.
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

/*
Our interact.js method allowing for our drag-and-drop system.
 */
interact('.dropzone').dropzone({

    // Only accept elements matching these CSS selectors.
    accept: [
        '#helmet',
        '#weapon',
        '#accessory',
        '#chest'
    ],

    // Percentage of required coverage of slot by item to activate valid drop.
    overlap: 0.85,

    /*
    Listener for drop related events.
     */
    ondropactivate: function(event) {

        // add active dropzone feedback
        event.target.classList.add('drop-active');

    },

    /*
    Listener for when an item is dragged to the center of the slot.
    Changes color once successful (green/red).
     */
    ondragenter: function(event) {

        // Assign our currently interacting objects
        draggableElement = event.relatedTarget;
        dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');

        // Checks if it's a valid item for this slot. If it is, apply
        // green background - if not, apply red.
        if (isValidItem(draggableElement, dropzoneElement)) {
          draggableElement.classList.add('can-drop');
        } else {
          draggableElement.classList.add('can-not-drop');
        }

    },

    /*
    Listener for when an item, which is currently centered on a slot, leaves
    the center of the slot (color goes back to purple).
     */
    ondragleave: function(event) {

        draggableElement = event.relatedTarget;
        dropzoneElement = event.target;
        isEquipped[draggableElement.classList.item(2)] = false;
        dropzoneElement.classList.remove('drop-target');
        itemRemoveColor(draggableElement);

    },

    /*
    Listener for when an item has been dropped on a slot. Here we check if
    it's a valid slot for the item, and if not, we return the item to it's
    origin.
     */
    ondrop: function(event) {

        dropzoneElement = event.target;
        draggableElement = event.relatedTarget;

        // Lets check if this is a valid drop zone
        if (isValidItem(draggableElement, dropzoneElement)
        && !isEquipped[draggableElement.classList.item(2)]) {
            isEquipped[draggableElement.classList.item(2)] = true;
        } else {
            itemReset(draggableElement);
        }
    },
    ondropdeactivate: function(event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});
