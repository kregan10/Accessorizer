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

// Initialize our character object
let character = {
    slots: {
        head: {
            isEquipped: false,
            item: null
        },
        chest: {
            isEquipped: false,
            item: null
        },
        weapon: {
            isEquipped: false,
            item: null
        },
        accessory: {
            isEquipped: false,
            item: null
        },
    },
    stats: {
        damage: 0,
        weight: 0,
        protection: 0
    }
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

/**
 * Add to our character's stats total.
 * @param {[type]} item     the item
 * @param {[type]} itemType the item type
 */
function addItem(item, itemType) {

    // Get stats from our item's tooltip div
    let damage = $('#' + item + ' .coupontooltip #damage').html();
    let protection = $('#' + item + ' .coupontooltip #protection').html();
    let weight = $('#' + item + ' .coupontooltip #weight').html();

    // Sum stats from new item
    character.stats.damage += parseInt(damage);
    character.stats.protection += parseInt(protection);
    character.stats.weight += parseInt(weight);

    // Fill character's slot for that item type
    character.slots[itemType].isEquipped = true;
    character.slots[itemType].item = item;

    console.log(character);
}

/**
 * Remove stats from our character's total upon removal of item
 * @param {[type]} item     the item
 * @param {[type]} itemType the item type
 */
function removeItem(item, itemType) {

    // Get stats from our item's tooltip div
    let damage = $('#' + item + ' .coupontooltip #damage').html();
    let protection = $('#' + item + ' .coupontooltip #protection').html();
    let weight = $('#' + item + ' .coupontooltip #weight').html();

    // Remove the stats from our character
    character.stats.damage -= parseInt(damage);
    character.stats.protection -= parseInt(protection);
    character.stats.weight -= parseInt(weight);

    // Don't let glitches ruin our stat floor
    if (character.stats.damage < 0) character.stats.damage = 0;
    if (character.stats.protection < 0) character.stats.protection = 0;
    if (character.stats.weight < 0) character.stats.weight = 0;

    // Empty the item slot upon the item leaving drag area.
    character.slots[itemType].isEquipped = false;
    character.slots[itemType].item = null;

    console.log(character);
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

        // The item and type that we're dragging (i.e. head, chest, etc.)
        let item = draggableElement.parentElement.id;
        let itemType = draggableElement.classList.item(2);

        // Remove our character's stats attributed to this item
        if (character.slots[itemType].isEquipped) {
            removeItem(item, itemType)
        }

        // Reset the color of our item back to normal
        itemRemoveColor(draggableElement);

        // Turn off our slot feedback
        dropzoneElement.classList.remove('drop-target');

    },

    /*
    Listener for when an item has been dropped on a slot. Here we check if
    it's a valid slot for the item, and if not, we return the item to it's
    origin.
     */
    ondrop: function(event) {

        dropzoneElement = event.target;
        draggableElement = event.relatedTarget;

        // The item name and type that we're dragging
        let item = draggableElement.parentElement.id;
        let itemType = draggableElement.classList.item(2);

        // Check if this is a valid drop zone for this itemType
        if (isValidItem(draggableElement, dropzoneElement)
            && !character.slots[itemType].isEquipped) {

            // Depending on our item, add stats to character's total.
            addItem(item, itemType);

        } else {

            // Invalid item, remove color and return to origin position
            itemReset(draggableElement);

        }
    },
    ondropdeactivate: function(event) {

        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');

    }
});
