
$(document).ready(function() {
  /*
  | Weapons
  */
  $("#m16").click(function() {
    // Checking if the image child of the div with the listed id has the class can-drop
    if ( $("#m16 img").hasClass( "can-drop" )) {
      $('#weapon-selected').val("m16");
    }
  });

  $("#groza").click(function() {
    if ( $("#groza img").hasClass( "can-drop" )) {
      $('#weapon-selected').val("groza");
    }
  });

  $("#frying-pan").click(function() {
    if ( $("#frying-pan img").hasClass( "can-drop" )) {
      $('#weapon-selected').val("frying-pan");
    }
  });

  /*
  | Head
  */
  $("#ballistic-mask").click(function() {
    if ( $("#ballistic-mask img").hasClass( "can-drop" )) {
      $('#head-selected').val("ballistic-mask");
    }
  });

  $("#level3-helmet").click(function() {
    if ( $("#level3-helmet img").hasClass( "can-drop" )) {
      $('#head-selected').val("level3-helmet");
    }
  });

  $("#level2-helmet").click(function() {
    if ( $("#level2-helmet img").hasClass( "can-drop" )) {
      $('#head-selected').val("level2-helmet");
    }
  });

  /*
  | Chest
  */
 $("#level1-vest").click(function() {
  if ( $("#level1-vest img").hasClass( "can-drop" )) {
    $('#chest-selected').val("level1-vest");
  }
  });

  $("#level2-vest").click(function() {
    if ( $("#level2-vest img").hasClass( "can-drop" )) {
      $('#chest-selected').val("level2-vest");
    }
  });

  $("#level3-vest").click(function() {
    if ( $("#level3-vest img").hasClass( "can-drop" )) {
      $('#chest-selected').val("level3-vest");
    }
  });

  /*
  | Accessory
  */
  $("#smoke-grenade").click(function() {
    if ( $("#smoke-grenade img").hasClass( "can-drop" )) {
      $('#accessory-selected').val("smoke-grenade");
    }
  });

  $("#frag-grenade").click(function() {
    if ( $("#frag-grenade img").hasClass( "can-drop" )) {
      $('#accessory-selected').val("frag-grenade");
    }
  });

  $("#redbull").click(function() {
    if ( $("#redbull img").hasClass( "can-drop" )) {
      $('#accessory-selected').val("redbull");
    }
  });
});
