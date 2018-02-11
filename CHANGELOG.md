# CHANGELOG.md

### Note: Add changelog at the bottom of the file

## 1.0.0 (2018-02-08)

Features:

  - Adding our initial front-end design.
  - HTML/CSS
      - 3 sections: items, slots, and stats.
  - JS
      - Listeners for drag-and-drop events.

## 1.0.1 (2018-02-08)

Features:

    - Adding categories to the 'accessorizer' page
    - Removed extraneous items. Sticking to 3 for each category.

## 1.0.2 (2018-02-18)

Features:

    - Added categories model

## 1.0.3 (2018-02-18)

    Features:

        - Added Homepage functionality

## 1.0.4 (2018-02-18)

    Features:

        - Added info controller
        - Bug fixed CSV Model to load correctly
        - Bug fixed MY_Model to load correctly
        - Added dummy data to CSV
        - Fixed autoload for categories

## 1.0.5 (2018-02-18)

    Features:

        - Added tooltips when hovering over items. These tooltips describe the item and show it's stats.

## 1.0.6 (2018-02-18)

    Features:
        - Added accessories model
        - Added accessories autoload
        - Added accessories CSV

## 1.0.7 (2018-02-18)

    Features:

        - Implemented the menubar partial.
        - Added loading of links from config.

## 1.0.8 (2018-02-18)

    Fixes:

        - Reference to drag-and-drop library removed from template. Had to put it back in.
        - Syntax error in accessories model

## 1.0.9 (2018-02-18)

    Fixes:

        - Improper naming of files in controllers, views, and menubar.

## 1.0.10 (2018-02-18)

    Fixes:

        - Removed unnecessary assets
        - Updated CSV file

## 1.0.11 (2018-02-18)

    Features:

        - Added body functionality for the info controller.
        - Added sets model
        - Added sets autoload
        - Added sets CSV

## 1.0.12 (2018-02-18)

    Features:

        - Added limit to items of certain categories
        - Added input field for set name on catalog page.

## 1.1.0 (2018-02-19)

    Features:

        - Loaded Accessories and Categories dynamically

    Fixes:
        - Changed info controller return values
        - Changed config.php session path
        - Removed Accessorizer controller and view
        - Removed static elements in catalog view
        - Changed Categories and Accessories CSV records

## 1.1.1 (2018-02-19)

    Fixes:
        - Changed config.php session path back to the original
        - Removed info controller return values

## 1.1.1 (2018-02-19)

    Fixes:
        - Added some styling for tooltips

## 1.1.2 (2018-02-19)

    Features:
        - character object in the js
            - holds necasary info on items and stats
        - Implemented totaling of stats on character through Listeners

    Fixes:
        - Refactored everything; general cleanup

## 1.1.3 (2018-02-19)

    Features:
        - stats bars now coordinate with updating of character's stats

    Fixes:
        - Some merge conflicts (left over git tags)

## 1.1.4 (2018-02-10)

    Features:
        - Added data.js to allow the retrieve information in real time.

## 1.1.4 (2018-02-10)

    Features:
        - Added reset button to catalog view for reseting the GUI and character stats for the build.

# 1.1.5 (2018-02-10)

    Fixes:
        - Rename accessories and categories table name
        - Added addition fields for model class
        - Fixed Memory_model class some()
        - Removing PHP code in catalog view
        - Fixed Catalog controller

# 1.1.6 (2018-02-11)

    Fixes:
        - Registered footer in config
        - Registered footer in template
        - Added footer.php with basic markup
        - Added styling for more consistent look
        - Updated base application title in MY_Controller

# 1.1.7 (2018-02-11)

    Features:
        - Added slots to the homepage

# 1.1.8 (2018-02-11)

    Features:
        - Added visual effects to the background.
