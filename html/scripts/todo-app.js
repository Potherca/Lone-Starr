/*
    - Housekeeping
        - Maintenance
            - Replace the toilet seat
======
Suggested format for T0d0.txt = +project @context (A) priority
 https://github.com/ginatrapani/todo.txt-cli/wiki/The-Todo.txt-Format
 http://todotxt.com/
======

[description] -> needs to be a verb

.------------------------------------------------------------------------------.
|                   ALL OF THESE NEED TO BE MOVED TO GITHUB                    |
'------------------------------------------------------------------------------'

MAJOR_TODOS:
     NOW WORKING ON:
        - Use different Icons based on CardType (add icons to CSS and fix bug in getCardType function)
        - Re-Style Form (Layout/Design)
        - readonly-fields, like creation date/modified date/author/etc (things that are calculated in the DB)
          need to be span/dl. For this to work, logic needs to be added to Couch Update Views
        --- nothing ---

    NEXT:
         1. Use CouchDb User functionality (Login/Role/etc.)
         2. Validation
        - Create-From-Parent does not set the Parent field!
        - There is no "DONE!" or "DELETE" card functionality
        - Author needs to be filled in (When users is implemented)

    BUGS/YET TO BE DONE:
    - PROJECT MANAGEMENT
        - Cleanup the JS files by moving stuff to Barf and include it using git-subtree
        - Several things could possible be moved to the server, like getting a cards type?

    - USABILITY ISSUE
        - CardType needs to be updated on Edit, not on Save (hijack validation)
        - When a link is added a new field needs to become available
        - When a depency is added a new field needs to become available

    - BUG IN THE LOGIC
        - Currently all items in the menu are marked as "T0D0" because either the form
          or the Cards are not loaded before the logic that calculates the CardType is triggered.
        - A task can be dependant on more than one other task
        - form input needs to be HTML Entity encoded, otherwise the descriptor won't appear in the menu if it contains a special character
        - When a tickets Descriptor is changed (onSave) the "Create Sub Item" and menu need to be re-rendered (refreshed)
        - When a tickets parent  is  changed   (onSave) the menu needs to be re-rendered (refreshed)
        - When a tickets parent  is  changed   (onSave) the cards Project needs to be re-calculated (refreshed)

    - IMPROVEMENTS
        - Add a from/to person?
        - research CouchDB's "validate_doc_update" (is the information in chapter 7 of the book still accurate?)
          and implement several checks like doc structure (allowed fields) and user (role?)
        - Use markdown for main text (usefull only when displayed as HTML when not edited)
        - Grab title from the first line, instead of having a separate input field
        - Wrap titles in tree
        - Disable the save button until a field is altered
        - Use Dynatree drag'n'drop to change parent
        - Have all sub-items be collapsed by default
        - Have the descriptor (at the very least) be required (=== implement validation, both in Client and on Couch)
        - Fix textarea sizes (and maybe implement an autogrow?)
        - Style fields to only look like form inputs when they are empty or have focus
        - trawl the code and remove all console.log() calls (or make debug.log())
        - There should also be an "archive" function, to move items marked "done" out of plain view.
          The easiest way I can think of is just add an extra flag (one "done" and one "archive/close")
          and have 2 buttons in the UI, on [Done!] and one [Done & Archive]. This would probable work in
          a similar manner to [Delete], including "undo" message.

    - DECISIONS/CHOICES TO MAKE
        - URL field: http:// or not? (user input, smart validation (accept both) or don't care?)
        - Do we need a "schedule-time" to accompany "schedule-date"? (For appointments, etc.) We could use a time Heatmap
        - Shouldn't we use event watchers for the (read-only) fields the are auto-generated?
        - Do we really need to split the deck of cards into 3: Todo/Note/Dump?

    - NEW FEATURES/OTHER IDEAS:
        - Break the menu down into smaller parts and call Views in the couch onClick
            (only important when amount of documents get larger?)
        - Dummy out all tickets (ideally as an example, with information explaining why what is what)
        - Priority needs to be a slider (low)-----|-----(high) with alphabetical values
        - if all that is set is the URL field, pull the content and display that
          instead of the form (collapse/hide the form and add [Show] button)
        - Instead of one doc per task, have one doc for all tasks, using the todo.txt syntax?
        - For multi-user support, why not encode the data using the password as a salt?
        - Edit *enitire* task as plain text, replacing the form with one-big-ass textarea for the user
          to edit (ala Futon interface?) just as if editing "todo.txt"
        - The DB name could be stored in a doc. On first-run (doc doesn't exist) we could show a form asking for values.
          Anything that is currently hardcoded could be set as default, allowing new users to override values.

    DONE:
        @BUG: radio buttons value is not saved
        @BUG: getCardType is flawed, it always returns "dump"
        - Accordion menu highlighting (what has focus, what is visible in Detail view) isn't clear
        @BUG: Type is not save!? Radio button WTF?!
        @BUG: The very first form isn't loaded (form loads, but without the data) === used a nasty hack (display:none;/.show())
        @BUG: If you try to make a new card after an existing card has been selected, the Creation-Date is no longer available
        @BUG  The indentation in the dropdown list is incorrect

        @DONE: Implement a fix for the "can't nest optgroup bug" (http://stackoverflow.com/questions/1037732/nesting-optgroups-in-a-dropdownlist-select)
        @DONE: Have buildMenu implement (an altered version?) of buildCardList()
        @DONE: Mark type of card (T0d0/Note/Dump)
        @DONE: DynaTree instead of accordion
        @DONE: Use a different Couch for Data and App === Made Couch settable.
        @DONE: We need a view in the Couch that returns all the context
        @DONE: Show revision number

        @DECIDE: Creation date vs. Modified date === Added a Creation date

*/

/**
 * JavaScript Debug - v0.4 - 6/22/2010
 * @copyright	2010 - "Cowboy" Ben Alman
 * @license		http://benalman.com/about/license/
 * @url			http://benalman.com/projects/javascript-debug-console-log/
 */
window.debug = window.debug || (function() {var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0) {(function(n) {h[n]=function() {m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0) {(function(n,o) {h[o]=function() {var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if (!d||!k(n)) {return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n) {if (f&&(g||!d||!d.log)) {f.apply(i,n)}}h.setLevel=function(n) {m=typeof n==="number"?n:9};function k(n) {return m>0?m>n:c.length+m<=n}h.setCallback=function() {var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n) {e(a[p++])}};return h})();
debug.info('Debugging is ' + (window.DEBUG = true));


/********( Add extra functionality to JQuery )*********************************/
/*!
 * ----- Based on the following (I added p_bSkipEmtyValues) -----
 *
 * jQuery serializeObject - v0.2 - 1/20/2010
 * http://benalman.com/projects/jquery-misc-plugins/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.

  $.fn.serializeObject = function(p_bSkipEmtyValues){
    p_bSkipEmtyValues = p_bSkipEmtyValues || false;

    var oSerialized = {};
    $.each( this.serializeArray(), function(){
        if (p_bSkipEmtyValues===false || (p_bSkipEmtyValues===true && this.value !== '')) {
            var sName = this.name,
                uValue = this.value
            ;

            oSerialized[sName] = oSerialized[sName] === undefined ? uValue
              : $.isArray( oSerialized[sName] ) ? oSerialized[sName].concat( uValue )
              : [ oSerialized[sName], uValue ];
        }
    });

    return oSerialized;
  };

})(jQuery);

/********( Overrides for JQuery UI Autocomplete )******************************/
$.widget( "custom.catcomplete", $.ui.autocomplete, {
            _renderMenu: function( ul, items ) {
                var   self = this
                    , currentCategory = ""
                ;
                $.each( items, function( index, item ) {
                    if ( item.category != currentCategory ) {
                        ul.append( "<li class='ui-autocomplete-category'>" + item.category + "<\/li>" );
                        currentCategory = item.category;
                    }
                    self._renderItem( ul, item );
                });
            }
        });

var Todo = function(p_sOverviewSelector, p_sDetailSelector, p_sCouch) {

    ////////////////////////// Settings and Options \\\\\\\\\\\\\\\\\\\\\\\\\\\\
    var   self = this
        , bFormLoaded = false
        , sOverviewSelector = p_sOverviewSelector
        , oCouch
    ;
    self.oCurrentCard = undefined;

    ///////////////////////////// Public Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    self.init = function(p_sOverviewSelector, p_sDetailSelector) {
        $(document).ready(function() {

//            var oResponse;
//            try {
//                oResponse = oCouch.open('config');
//            } catch(e) {
//                oResponse = e;
//            }
//
//            if (typeof self.config !== 'Object') {
//                self.config = {context:{}};
//            }

            var $Form = loadForm(p_sDetailSelector, '#details-form')
            loadMenu(true);
            // @TODO: Check hash and/or Read cookie and load appropriate Card to form
            // This would also require action later on to select right place in menu
            loadButtons();
    //        _addCardSelect();
    //        _addCardList();
        });
    };

    ///////////////////////////// Private Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function resetCreateChildButton() {

        if (typeof self.oCurrentCard !== 'undefined') {
            $('button[name="create-new-child"]')
                    .html('Create Sub- Item for <code>' + self.oCurrentCard.descriptor + '<\/code>')
                    .attr('disabled', false)
                    ;
        } else {
            $('button[name="create-new-child"]')
                    .html('Create Sub- Item')
                    .attr('disabled', true)
                    ;
        }
    }

    function loadButtons() {
        function handler(p_oEvent) {
            p_oEvent.preventDefault();

            var sType = this.name.split('-').pop();

            var $Form = loadForm(p_sDetailSelector, '#details-form');
            $Form.show();
            resetCreateChildButton();
            deselectMenu();

            switch (sType) {
                case 'child':
                    populateFormFromParent($Form, self.oCurrentCard);
                    self.oCurrentCard = undefined;
                    break;

                case 'item':
                    self.oCurrentCard = undefined;
                    resetForm($Form);
                    break;
            }
        }

        $('#create-new-item-form [name="create-new-item"]').click(handler);
        $('#create-new-item-form [name="create-new-child"]').click(handler);
    }

    function getCards(p_bRefresh) {
        p_bRefresh = p_bRefresh || false;

        if (p_bRefresh === true || typeof self.oCards === 'undefined') {
            var oDocs = oCouch.allDocs({"include_docs":true});
            var iCount = 0;
            self.oCards = {};

            $.each(oDocs.rows, function(p_iIndex, p_oDoc) {
                //@TODO: Find a smarter filter than checking for hash as ID
                if (p_oDoc.id.length === 32) {
                    p_oDoc.doc.cardtype = getCardTypeFromDoc(p_oDoc.doc);
                    self.oCards[p_oDoc.id] = p_oDoc.doc;
                    iCount++;
                }
            });

            self.iCardCount = iCount;
            debug.log('-- getCards -- Loaded from DB: ', self.oCards);
        }

        return self.oCards;
    }

    function getCardTypeFromDoc(p_oDoc){
        var   sType = 'todo'
            , $Nodes = $('#details-form').find('.required') // @TODO: Shouldn't this use getForm() or loadForm() or something?
        ;
console.log($Nodes.length);
        $Nodes.each(function(){
            var $this = $(this);
            console.log($this.attr['name']);//, p_oDoc[$this.attr['name']]);
            if(sType === 'todo' && $this.hasClass('todo') && !p_oDoc[$this.attr['name']]){
                // Any empty "T0D0" field! Degrade to "NOTE"
                sType = 'note';
            }else if(sType === 'note' && $this.hasClass('note')  && !p_oDoc[$this.attr['name']]){
                // Any empty "NOTE" fields and the card is degraded to "DUMP"
                sType = 'dump';
            }else{
                // don't care
            }
        });

        return sType;
    }

    function getCardTypeFromForm(p_$Form) {
        var   sType = 'todo'
            , $Nodes = p_$Form.find('.required')
        ;

        $Nodes.each(function(){
            var $this = $(this);
            if(sType === 'todo' && $this.hasClass('todo') && !$this.val()){
                // Any empty "T0D0" field! Degrade to "NOTE"
                sType = 'note';
            }else if(sType === 'note' && $this.hasClass('note')  && !$this.val()){
                // Any empty "NOTE" fields and the card is degraded to "DUMP"
                sType = 'dump';
            }else{
                // don't care
            }
        });

        return sType;
    }

    function buildCardList(p_sNodeType, p_bRefresh) { // ul>li, optGroup>option, dt/dd?, etc
        p_bRefresh = p_bRefresh || false;

        var sTag, sGroupTag, sAttr;

        switch (p_sNodeType) {
            case 'list':
                sTag = 'li';
                sGroupTag = 'ul';
                sAttr = 'class';
            break;

            case 'select':
                sTag = 'option';
                sGroupTag = 'optgroup';
                sAttr = 'value';
            break;

            default:
                throw new Error('buildCardList(): Unsupported NodeType ' + p_sNodeType);
            break;
        }

        function emptyGroup(){
            return $('<' + sGroupTag + '><\/' + sGroupTag + '>');
        }

        function addChildToParent(p_$Child, p_$Parent){
            if(p_$Parent.children().length < 1){
                p_$Parent.append(emptyGroup());
            }
            p_$Parent.find(sGroupTag).first().append(p_$Child.detach());
        }

        function addLevel(p_$Node, p_bAddTextIndent){
            p_bAddTextIndent = p_bAddTextIndent || false;

            var iParentLevel = parseInt(p_$Node.parent().attr('level') || -1, 10);

            if(p_$Node.is(sGroupTag)){
                // add same level as containing tag
                p_$Node.attr('level', iParentLevel)
            }else{
                p_$Node.attr('level', iParentLevel + 1);
                if(p_bAddTextIndent === true){
                    var sText = '';
                    // @TODO: Nicer formatting, ASCII-Art style?
                    var   iLevel = parseInt(p_$Node.attr('level'), 10)
                        , sSpaceChar = '&nbsp;&nbsp;'  // '&#8739;'; // DIVIDES
                    ;
                    if(iLevel > 0){
                        iLevel = iLevel * sSpaceChar.length;
                        var sSpaces = '';
                        while (sSpaces.length < iLevel) {
                            sSpaces += sSpaceChar;
                        }
                        sText += sSpaces + '&#8735;'; // RIGHT ANGLE
//                    }else{
//                        sText += sSpaces + '&#8866;'; // RIGHT TACK
                    }
                    p_$Node.prepend(sText);
                }
            }

            p_$Node.children().each(function(){
                if(!$(this).attr('level')){
                    addLevel($(this), p_bAddTextIndent);
                }
            });
        }

        function buildTree() {
            var $Tree = emptyGroup();
            var $Cave = emptyGroup();

            $.each(getCards(p_bRefresh), function(p_sIndex, p_oCard) {
                var $Child = $(
                      '<' + sTag
                    + ' ' + sAttr + '="' + p_oCard._id + '"'
                    + ' data="addClass: \'cardtype-' + p_oCard.cardtype + '\'"'
                    + '>'
                    + p_oCard.descriptor
                    + '<\/' + sTag + '>'
                );

                if (p_oCard.parent) {
                    var $ParentInCave = $Cave.find('._' + p_oCard.parent);
                    var $ParentInTree = $Tree.find('._' + p_oCard.parent);

                    if ($ParentInTree.length > 0) {
                        addChildToParent($Child, $ParentInTree);
                    } else if ($ParentInCave.length > 0) {
                        addChildToParent($Child, $ParentInCave);
                    } else {
                        // Put in $Cave, will be added to $Tree later
                        $Cave.append($Child.detach())
                    }
                } else {
                    // No parent === Root Node in tree
//                    $Tree.append($Child.attr('level',1));
                    $Tree.append($Child);
                }
            });

            $Cave.children().each(function(p_iIndex, p_oChild){
                var $Child = $(this);
                var sParentId = getCards()[$Child.attr(sAttr)].parent;//.substring(1); // Remove the prefix
                var $ParentInCave = $Cave.find('[' + sAttr + '="' + sParentId + '"]');
                var $ParentInTree = $Tree.find('[' + sAttr + '="' + sParentId + '"]');

                if ($ParentInTree.length > 0) {
                    addChildToParent($Child, $ParentInTree);
                } else if ($ParentInCave.length > 0) {
                    addChildToParent($Child, $ParentInCave);
                } else {
                    // Leave in $Cave, mark as orphan later
                }
            });

            if($Cave.children().length > 0){
                debug.warn('-- buildCardList: Orphan Card Found! ', $Cave.children());
            }

            return $Tree;
        }

        var $Tree = buildTree();

        /* Do post-processing */
        switch (p_sNodeType) {
            case 'list':
                addLevel($Tree.children(), false);
            break;

            case 'select':
                addLevel($Tree.children(), true);
                /*
                 * Untill HTML properly selects nested optgroups (or a working UI
                 * plugin is found, we simple flatten the list, adding indents for
                 * each level a item is at.
                 */
                $Tree.find(sGroupTag).each(function(p_iIndex, p_oNode){
                    var $Node = $(p_oNode);
                    $Node.parent().after($Node.detach());
                });
                $Tree.find(sTag).unwrap();
            break;

            default:
                // Already thrown out by previous switch
            break;
        }

        return $Tree;
    }

    function getProjectName(p_oDoc){
        var oCards = getCards()
            , oTarget = p_oDoc
        ;

        while(oTarget.parent){
            oTarget = oCards[oTarget.parent];
        }

        return oTarget.descriptor || '';
    }

    function getContext(p_bRefresh){
        p_bRefresh = p_bRefresh || false;

        if (p_bRefresh === true || typeof self.aContext === 'undefined') {
            var oResponse, aContext = [], oContext = {};
            try {
                oResponse = oCouch.view('app/context', {group_level:1});
            } catch(e) {
                oResponse = e;
            }

            debug.log('Response for Context: ', oResponse);

            if (oResponse) {
                // Sort all Contexts into Categories
                $.each(oResponse.rows, function(p_iIndex, p_oContext){
                    var aContextKeys = p_oContext.key.split(':',2);
                    if(aContextKeys.length === 1){
                        // No Category found
                        aContextKeys[1] = aContextKeys[0];
                        aContextKeys[0] = 'Un-Categorized';
                    }

                    if(typeof oContext[aContextKeys[0]] === 'undefined'){
                        oContext[aContextKeys[0]] = [];
                    }
                    oContext[aContextKeys[0]].push(aContextKeys[1]);
                });
            }

            // Build Output Array
            $.each(oContext, function(p_sCategory, p_aContexts){
                p_aContexts.sort();
                $.each(p_aContexts, function(p_iIndex, p_sLabel){
                    aContext.push({"category": p_sCategory, "label": p_sLabel, "value":p_sCategory +':'+p_sLabel});
                });
            });
            self.aContext = aContext;
            debug.log('-- getContext -- Loaded from DB: ', self.aContext);
        }

        return self.aContext;
    }

    //////////////////////////// Menu Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function loadMenu(p_bRefresh) {
        p_bRefresh = p_bRefresh || false;
        debug.log('-- loadMenu Called: ', p_bRefresh);

        function attachLinks(p_$CardList){
            return p_$CardList.find('li').each(function(){
                var   $this = $(this)
                    , $Children = $this.children().detach()
                    , sHref = '#/todo-app/' + $this.attr('class')
                    , $a = $('<a href="' + sHref + '"><\/a>')
                        .text( $this.get(0).firstChild?$this.get(0).firstChild.nodeValue:'--?--' )
                        .click(menuLinkClick)
                ;

                if($Children.length < 1){
                    $(this).addClass('no-children');
                }
                $(this).html($a).append($Children);
            });
        }

        var $CardList = buildCardList('list', p_bRefresh);
        attachLinks($CardList);
        self.menu = $CardList;
        $(sOverviewSelector).html(self.menu).dynatree({
              persist: true
//            , autoCollapse: true
            , onClick: menuLinkClick
        });

        // Add "Expand/Collapse all" link
        var $e = $('<button>Expand all<\/button>').click(function(){
            $(sOverviewSelector).dynatree('getRoot').visit(function(node){
                node.expand(true);
            });
        });
        var $c = $('<button>Collapse all<\/button>').click(function(){
            $(sOverviewSelector).dynatree('getRoot').visit(function(node){
                node.expand(false);
            });
        });
        $(sOverviewSelector).prepend(
            $('<div></div>').addClass('utility-bar').append($e,'<span> / </span>',$c)
        );

        function accordion(){
            $(sOverviewSelector).find('ul').accordion({
    //            collapsible: true
                    event: "mouseover"
                    , fillSpace : true
                })
    //            .sortable({"cancel": "div"})
    //            .disableSelection()
            ;

            deselectMenu(); // Accordion state selects first item by default
        }
    }

    function deselectMenu() {
//        $(self.menu).find('.ui-state-active').removeClass('ui-state-active ui-corner-top').addClass('ui-state-default ui-corner-all');
        // @TODO Do DynaTree specific deselect
    }

    //////////////////////////// Form Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function addValueToField(p_$Node, p_sName, p_sValue){
        if(p_$Node.length < 1){
            // nothing to do
        }else if($.inArray(p_$Node.get(0).nodeName.toLowerCase() , ['input','select','textarea']) === -1){
            var sValue = p_sValue;
            if(p_sName === '_rev'){
                sValue = p_sValue.split('-')[0];
            }
            p_$Node.html(sValue);
        }else if(p_$Node.attr('type') === 'radio'){
            if(p_$Node.val() === p_sValue){
                p_$Node.attr('checked','checked');
            }
        }else{
            p_$Node.val(p_sValue);
        }
        return p_$Node;
    }

    function resetForm(p_$Form) {

        function resetSelectOptions(p_$Form) {
            p_$Form.find('option').show();

            if (typeof self.oCurrentCard !== 'undefined') {
                p_$Form.find('option[value="' + self.oCurrentCard._id + '"]').hide();
            }
            return p_$Form;
        }

        $(':input', p_$Form).not(':button, :submit, :reset, :radio, :checkbox').val('');

        $(':radio, :checkbox', p_$Form).removeAttr('checked');

        // Set Creation date and Modified date
        p_$Form.find('[name="creation-date"], [name="modified-date"]').each(function(/*p_iIndex, p_oElement*/) {
            if (this.value === '') {
                this.value = new Date().toString();
            }
        });

        var $Select = $('select', p_$Form);
        $Select.find(':selected[value!=""]').removeAttr('selected');

        resetSelectOptions(p_$Form);
        resetCreateChildButton();
    }

    function populateFormFromParent(p_$Form, p_oDoc) {
        debug.log('-- populateFormFromParent Called: ', p_$Form, p_oDoc);
        populateForm(p_$Form, p_oDoc, true);
    }

    function populateForm(p_$Form, p_oDoc, p_bParent) {
        debug.log('-- populateForm Called: ', p_$Form, p_oDoc, p_bParent);

        p_bParent = p_bParent || false;

        if (p_bParent === true) {
            var aParentFields = ['category'];
        }

        resetForm(p_$Form);

        $.each(p_oDoc, function(p_sName, p_sValue) {
            if (p_$Form.find('[name="' + p_sName + '"], .show_' + p_sName).length > 0) {

                if (p_bParent === false || (p_bParent === true && $.inArray(p_sName, aParentFields) > -1)) {
                    var $Fields = p_$Form.find('[name="' + p_sName + '"], .show_' + p_sName);
                    $Fields.each(function(){
                        addValueToField($(this), p_sName, p_sValue);
                    });
                }
            } else {
                debug.log('Could not find field for "' + p_sName + '".');
            }
        });

        // Add list of Projects to Project Select box
        $('input[name="project"]').val(getProjectName(p_oDoc));

        // Add card type
//        addValueToField($('[name="cardtype"]'), 'cardtype', getCardTypeFromForm(p_$Form));
//        addValueToField($('[name="cardtype"]'), 'cardtype', getCardTypeFromDoc(p_oDoc));
        addValueToField($('[name="cardtype"]'), 'cardtype', p_oDoc.cardtype);
    }

    function loadForm(p_sTargetSelector, p_sSourceSelector) {
        debug.log('-- loadForm Called: ', p_sTargetSelector, p_sSourceSelector);

        if ($(p_sSourceSelector).length === 0) {
            debug.log('-- loadForm: loading ' + p_sSourceSelector + '');
            bFormLoaded = false;

            return $(p_sTargetSelector).load(
                    './forms.html ' + p_sSourceSelector
                    , function(/*p_sResponseText/*, p_sTextStatus/*, p_oXMLHttpRequest*/) {
                        var $Form = $(this).find('form');
                        // @TODO: Handle AJAX Errors
                        enhanceForm($Form);
                        bFormLoaded = true;
                    }
            ).find('form');
        } else {
            debug.log('-- loadForm: ' + p_sSourceSelector + ' already loaded');
            return $(p_sSourceSelector);
        }
    }

    // @TODO: Implement Logic!
    function validateForm(p_$Form) {
        // This could also be done on the couch. Or *only* on the couch!
        debug.log('-- validateForm Called: ', p_$Form);

        return true;
    }

    function saveForm(p_$Form) {
        debug.log('-- saveForm Called: ', p_$Form);

        var oJson = p_$Form.serializeObject(true);

        debug.log('Data to save: ', oJson);

        var oResponse;
        try {
            oResponse = oCouch.save(oJson);
        } catch(e) {
            oResponse = e;
        }

        debug.log('Save response: ', oResponse);

        if (typeof oResponse.ok !== 'undefined' && oResponse.ok) {
            p_$Form.find('[name="_id"]').val(oResponse.id);
            p_$Form.find('[name="_rev"]').val(oResponse.rev);
        } else {
            if (typeof oResponse.reason !== 'undefined') {
                alert('Could not save data. ' + oResponse.reason);
            } else {
                alert('Could not save data. ' + 'Unknown Error Occurred.');
            }
        }

        if (typeof getCards()[oResponse.id] === 'undefined') {
            debug.log('New entry, refresh menu');
            loadMenu(true);
        } else {
            debug.log('Exists entry, already in menu, just refresh data');
            $.each(getCards()[oResponse.id], function(p_sName/*, p_sValue*/) {
                getCards()[oResponse.id][p_sName] = oJson[p_sName];
            });
        }

        return p_$Form;
    }

    function enhanceForm(p_$Form) {
        debug.log('-- enhanceForm Called: ', p_$Form);

        resetCreateChildButton();

        // Create Date Picker for Due Date
        var i = document.createElement("input");
        i.setAttribute("type", "date");
        if (i.type == "text") {
            p_$Form.find('[type="date"]').datepicker({
                changeMonth: true
                , changeYear: true
                , showWeek: true
                , firstDay: 1
                , dateFormat: 'yy-mm-dd'
                , beforeShow: function(p_oElement, p_oEvent) {
                    p_oEvent.dpDiv.css({marginTop: -p_oElement.offsetHeight + 'px', marginLeft: -p_oElement.offsetWidth + 'px'});
                }
            });
        }

        // Create Button Set for Type
//        p_$Form.find(".type-container").buttonset();

        // Make AutoComplete for context
        p_$Form.find('[name="context"]')
            // don't navigate away from the field on tab when selecting an item
                .bind("keydown", function(event) {
                    if (event.keyCode === $.ui.keyCode.TAB
                            && $(this).data("autocomplete")
                            && $(this).data("autocomplete").menu.active
                            ) {
                        event.preventDefault();
                    }
                })
                .catcomplete({
                    minLength: 0,
                    delay: 0,
                    source: function(request, response) {
                        // delegate back to autocomplete, but extract the last term
                        response(
                            $.ui.autocomplete.filter(
                                getContext(), request.term.split(/,\s*/).pop()
                            )
                        );
                    },
                    focus: function() {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function(event, ui) {
                        var terms = this.value.split(/,\s*/);
                        // remove the current input
                        terms.pop();
                        // add the selected item
                        terms.push(ui.item.value);
                        // add placeholder to get the comma-and-space at the end
                        terms.push("");
                        $(this).val(terms.join(", "));

                        // @TODO: Filter already selected context from list

                        return false;
                    }

                });

        // Add list of Cards to Parent Select box
        $('.cardlist').append(buildCardList('select'));

        p_$Form.submit(
            function(p_oEvent) {
                p_oEvent.preventDefault();
                if (validateForm(p_$Form) === true) {
                    saveForm(p_$Form);
                } else {
                    // Warnings should have already been generated
                    debug.log('Error: Form does not validate.');
                }
            }
        );

        return p_$Form;
    }

    // @TODO: Implement Logic!
    function refreshFormProjectFields(p_$Form) {

    }

    // @TODO: Implement Logic!
    function refreshFormCardListFields(p_$Form) {

    }

    /////////////////////////// Event Handlers \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /* All event handler functions reside here, so they can be included simply
     * by referencing them by name...
     */
    function menuLinkClick(p_oNode, p_oEvent){
//            p_oEvent.preventDefault();
        if(p_oEvent.target.nodeName === 'A'){

            var oFormWrapper = loadForm(p_sDetailSelector, '#details-form');
            // Get doc from stack using ID from hash
            // @TODO: Validate this works in other browsers than Chrome...
//            var id = p_oEvent.currentTarget.hash.substring('#/todo-app/'.length); //regular click event
            var id = p_oNode.span.children[3].hash.substring('#/todo-app/'.length); // DynaTree Click Event
            var i = 0;

            (function() {
                    if (i > 3000){// Timeout after 3 seconds
                        debug.error('-- Click Event Timed out.', p_oNode);
                    }else if (bFormLoaded === true){//oFormWrapper && oFormWrapper.length && oFormWrapper.length > 0) {
                            $('#details-form').show();
                            oFormWrapper[0].reset();

                            self.oCurrentCard = getCards()[id];
                            populateForm(oFormWrapper, self.oCurrentCard);
                    } else {
                        i++;
                        setTimeout(arguments.callee)
                    }
                })();
        }
    }

    //////////////////////////// Proof of Concept \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    function _addCardSelect(){
        var $CardList = buildCardList('select');//.get(0);

//        // @TODO: code Cleanup
//        function fixSelectMenu(p_$SelectMenu){
//            // the first child contains root level, everything beneath that has
//            // been inadvertantly pulled out at a lower level and placed in root
//            // by (a bug in?) the logic of the SelectMenu functionality.
//
//            // take all but the first of the direct children
//            p_$SelectMenu.children("li:gt(0)").each(function(){
//                var $Span = $(this).find('span:first-child');
//                var sParentId = $Span.text();
//                $Span.remove();
//                var $Parent = p_$SelectMenu.find('.' + sParentId);
//                // yank the <ul> out and append it to the parent
//                $Parent.append($(this).detach());
//            });
//        }
//
//
//        // @FAIL: All that work just to find out the selectmenu also doesn't support nested optgroups/ul. Grrr.
//        $('#detail').html($('<select size=1></select>').append($CardList));
//        $('#detail').find('select').selectmenu();
//        // @TODO: Make selection more precise in case of multiple select menu's
//        // get selectmenu's id, get ul linked to that ID
//        fixSelectMenu($('ul.ui-selectmenu-menu'));
        $('#detail').append($('<select></select>').append($CardList));
    }

    function _addCardList(){
        var $CardList = buildCardList('list');
        $('#detail').append($CardList);
    }
    ///////////////////////////// Debug Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    (function() {
        self.debugMe = undefined;
        var debugCounter = 0;
        self._debug = function() {
            var html = '';
            if (self[self.debugMe]) {
                html += '<ul>';
                $.each(self[self.debugMe], function(p_sName, p_sValue) {
                    html += '<li><code>' + p_sName + '</code> = ' + p_sValue + '<\/li>';
                });
                html += '<\/ul>';

                $('#debug').addClass('success').removeClass('fail');
            } else {

                $('#debug').addClass('fail').removeClass('success');
            }
            $('#debug').html((debugCounter++) + html);
        }
    })();

    //////////////////////////// Init the class \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Wait for the Couch object to become available before we do anything else.
    var i = 0;
    (function() {
        if (i > 3000){// Timeout after 3 seconds
            debug.error('-- Timed out waiting for CouchDB becoming available.');
        }else if (window.CouchDB) {
            // @TODO: First get a list of available Couches to validate the given Apps/Storage DB actually exists
            oCouch = new CouchDB(p_sCouch, null);
            self.init(p_sOverviewSelector, p_sDetailSelector);
        } else {
            setTimeout(arguments.callee)
        }
    })();
};

Todo.load = function(p_sOverviewSelector, p_sDetailSelector, p_sCouch){
    window.oTodo = new window.Todo(p_sOverviewSelector, p_sDetailSelector, p_sCouch);
};
