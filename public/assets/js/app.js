/**
 * Sets the data for the homepage.
 */
data.getSets(function (sets) {
    sets.forEach(function (set) {
        console.log(set.name);
        // Add set name to the homepage.
        $("#homepage-presets").append('<li class="dropdown-item"><a href="#">' + set.name + '</a></li>');
    });
});