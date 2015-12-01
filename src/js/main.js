'use strict';

// 
// We always need jQuery
// 

import $          from 'jquery';

//
// Framework
// 

import foundation from 'foundation-sites';

//
// Main Script
//

(function ($, window, document) {
  
  window.Main = {
    
    options : {
      
    },
    
    init : function () {
      
      // Bootstrap Foundation
      $(document).foundation();
      
      // Your code...
      
    }
    
  };
  
  // Bootstrap your website
  $(document).ready(window.Main.init);
  
}($, window, window.document));