/* Document On-Load's
------------------------------------------------------------------------------*/

$(function() {

    /**
     * Event listener for homepage presets.
     */
    $("#homepage-presets").on('click', 'li', loadPreset);

    /**
     * Loads the pre-set options onto the character.
     */
    function loadPreset()
    {
        // Get the set id.
        var setID = $(this).attr("data-setid");

        // Query the specific set.
        data.getSets(setID, function(set) {
            
            // Load in the accessories.
            data.getCatalog(null, function(catalog) {

                // Set chest preset.
                $('#chest').html('');
                $('#chest').prepend('<img class="draggable drag-drop chest can-drop" src="' + catalog[set["chest"]].accessoryImage + '" />')
                
                // Set head preset.
                $('#head').html('');
                $('#head').prepend('<img class="draggable drag-drop head can-drop" src="' + catalog[set["head"]].accessoryImage + '" />')

                // Set weapon preset.
                $('#weapon').html('');
                $('#weapon').prepend('<img class="draggable drag-drop weapon can-drop" src="' + catalog[set["weapon"]].accessoryImage + '" />')

                // Set accessory preset.
                $('#accessory').html('');
                $('#accessory').prepend('<img class="draggable drag-drop accessory can-drop" src="' + catalog[set["accessory"]].accessoryImage + '" />')

                // Get the values of all the sets.
                // TODO: Add a column in pre-defined sets with this value calculated beforehand.
                var damage = parseInt(catalog[set["chest"]].accessoryDamage) + parseInt(catalog[set["head"]].accessoryDamage) + parseInt(catalog[set["weapon"]].accessoryDamage) + parseInt(catalog[set["accessory"]].accessoryDamage);
                var protection = parseInt(catalog[set["chest"]].accessoryProtection) + parseInt(catalog[set["head"]].accessoryProtection) + parseInt(catalog[set["weapon"]].accessoryProtection) + parseInt(catalog[set["accessory"]].accessoryProtection);
                var weight = parseInt(catalog[set["chest"]].accessoryWeight) + parseInt(catalog[set["head"]].accessoryWeight) + parseInt(catalog[set["weapon"]].accessoryWeight) + parseInt(catalog[set["accessory"]].accessoryWeight);

                // Get our stats bars
                let damageBar = $('.stats .progress #damage-bar').get(0);
                let protectionBar = $('.stats .progress #protection-bar').get(0);
                let weightBar = $('.stats .progress #weight-bar').get(0);

                // Update stat bar values.
                damageBar.setAttribute('aria-valuenow', parseInt(damage));
                protectionBar.setAttribute('aria-valuenow', parseInt(protection));
                weightBar.setAttribute('aria-valuenow', parseInt(weight));

                // Update width settings.
                damageBar.style.width = "" + damage + "%";
                protectionBar.style.width = "" + protection + "%";
                weightBar.style.width = "" + weight + "%";
            });

        });
    }

    function displayPreset()
    {

    }

});


/* Tooltip-on-Hover
------------------------------------------------------------------------------*/

let tooltip = document.querySelectorAll('.coupontooltip');

document.addEventListener('mousemove', function(e) {
    for (let i = tooltip.length; i--;) {
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

// Our item and itemType currently selected
let item;
let itemType;

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

let resetButton = $('#set-reset').click(function() {
    let all = $('.can-drop').toArray();
    characterReset();
    for (var i = 0; i < all.length; i++) {
        itemReset(all[i]);
    }
    updateStatsBars();
});


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
    let damage = $('#' + item + ' .coupontooltip .coupontooltip-text #damage').html();
    let protection = $('#' + item + ' .coupontooltip .coupontooltip-text #protection').html();
    let weight = $('#' + item + ' .coupontooltip .coupontooltip-text #weight').html();

    // Sum stats from new item
    character.stats.damage += parseInt(damage) || 0;
    character.stats.protection += parseInt(protection) || 0;
    character.stats.weight += parseInt(weight) || 0;

    // Fill character's slot for that item type
    character.slots[itemType].isEquipped = true;
    character.slots[itemType].item = item;

    updateStatsBars();

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

    updateStatsBars();

}

/**
 * Update the values of the stats bars to represent character's current stats.
 */
function updateStatsBars() {

    // Get our stats bars
    let damageBar = $('.stats .progress #damage-bar').get(0);
    let protectionBar = $('.stats .progress #protection-bar').get(0);
    let weightBar = $('.stats .progress #weight-bar').get(0);

    damageBar.setAttribute('aria-valuenow', parseInt(character.stats.damage));
    protectionBar.setAttribute('aria-valuenow', character.stats.protection);
    weightBar.setAttribute('aria-valuenow', character.stats.weight);

    damageBar.style.width = "" + character.stats.damage + "%";
    protectionBar.style.width = "" + character.stats.protection + "%";
    weightBar.style.width = "" + character.stats.weight + "%";

}

/**
 * Resets the character's stats and booleans.
 */
function characterReset() {

    let slots = character['slots'];
    let stats = character['stats'];

    for (var key in slots) {
        slots[key].isEquipped = false;
        slots[key].item = null;
    }

    for (var key in stats) {
        stats[key] = 0;
    }

}

/**
 * Places all the items on screen from a particular set.
 * @param  {String} set the name of the set
 */
function getItems(set) {
    console.log(set);
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

        // The item and type that we're dragging (i.e. head, chest, etc.)
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');

        // Checks if it's a valid item for this slot. If it is, apply
        // green background - if not, apply red.
        if (isValidItem(draggableElement, dropzoneElement) &&
            !character.slots[itemType].isEquipped) {

            console.log(draggableElement);

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
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // Remove our character's stats attributed to this item
        if (character.slots[itemType].isEquipped &&
            draggableElement.classList.contains('can-drop')) {
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
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // Check if this is a valid drop zone for this itemType
        if (isValidItem(draggableElement, dropzoneElement) &&
            !character.slots[itemType].isEquipped) {

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
