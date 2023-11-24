const hoverContribution = {
    getId: function() {
        return 'myHoverProvider';
    },
    provideHover: function (model, position) {
        // Get the word at the position
		console.log("test")
        var wordAtPosition = model.getWordAtPosition(position);
        if (wordAtPosition) {
            var lineContent = model.getLineContent(position.lineNumber);
            var colonIndex = lineContent.indexOf(':', wordAtPosition.endColumn - 1);

            // Check if the colon exists and is located after the word
            if (colonIndex > -1) {
                // It's a key, so don't provide hover information
                return null;
            } else {
                // It's a value, so provide hover information
                var range = new monaco.Range(
                    position.lineNumber,
                    wordAtPosition.startColumn,
                    position.lineNumber,
                    wordAtPosition.endColumn
                );
                return {
                range: range,
                contents: [
                    { value: '**TOKEN**' },
                    { value: '```json\n' + wordAtPosition.word + '\n```' },
                ]
            };
            }
        }
        return null;  // return null if no word at position
    },
    hover: function(e) {
        // Triggered whenever a hover occurs
        console.log('Hover event triggered', e);
    }
};

// Register the hover provider with the IEditorContribution
monaco.languages.registerHoverProvider('json', hoverContribution);

var json = {
  jsonrpc: "2.0",
  id: -1,
  result: {
    hash: "E38D16712833BA89DE7B37D269A92215528E62B6CEABD31C55090821E949F491",
    height: "244097",
    index: 0,
    tx_result: {
      code: 0,
      data: "EioKKC9jZWxlc3RpYS5ibG9iLnYxLk1zZ1BheUZvckJsb2JzUmVzcG9uc2U=",
      log: '[{"msg_index":0,"events":[{"type":"celestia.blob.v1.EventPayForBlobs","attributes":[{"key":"blob_sizes","value":"[123292]"},{"key":"namespaces","value":"[\\"AAAAAAAAAAAAAAAAAAAAAAAAAAeNI9eoh/7wVHs=\\"]"},{"key":"signer","value":"\\"celestia1vdjkcetnw35kzvtpwye8gdtvxfu8jcmh8y685emcvuenydekxp5rj6mxx36ksctn0y6rywfswahq0lqt35\\""}]},{"type":"message","attributes":[{"key":"action","value":"/celestia.blob.v1.MsgPayForBlobs"}]}]}]',
      info: "",
      gas_wanted: "1136276",
      gas_used: "1123198",
      events: [
        {
          type: "use_feegrant",
          attributes: [
            {
              key: "Z3JhbnRlcg==",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
            {
              key: "Z3JhbnRlZQ==",
              value:
                "Y2VsZXN0aWExYXEydDVsMnh5Y3c5NHpneGczMjc2MGg5a2Y0dWhhc3k0Mjkwd24=",
              index: true,
            },
          ],
        },
        {
          type: "update_feegrant",
          attributes: [
            {
              key: "Z3JhbnRlcg==",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
            {
              key: "Z3JhbnRlZQ==",
              value:
                "Y2VsZXN0aWExYXEydDVsMnh5Y3c5NHpneGczMjc2MGg5a2Y0dWhhc3k0Mjkwd24=",
              index: true,
            },
          ],
        },
        {
          type: "coin_spent",
          attributes: [
            {
              key: "c3BlbmRlcg==",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
            { key: "YW1vdW50", value: "MTEzNjI4dXRpYQ==", index: true },
          ],
        },
        {
          type: "coin_received",
          attributes: [
            {
              key: "cmVjZWl2ZXI=",
              value:
                "Y2VsZXN0aWExN3hwZnZha20yYW1nOTYyeWxzNmY4NHoza2VsbDhjNWxwbmpzM3M=",
              index: true,
            },
            { key: "YW1vdW50", value: "MTEzNjI4dXRpYQ==", index: true },
          ],
        },
        {
          type: "transfer",
          attributes: [
            {
              key: "cmVjaXBpZW50",
              value:
                "Y2VsZXN0aWExN3hwZnZha20yYW1nOTYyeWxzNmY4NHoza2VsbDhjNWxwbmpzM3M=",
              index: true,
            },
            {
              key: "c2VuZGVy",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
            { key: "YW1vdW50", value: "MTEzNjI4dXRpYQ==", index: true },
          ],
        },
        {
          type: "message",
          attributes: [
            {
              key: "c2VuZGVy",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
          ],
        },
        {
          type: "tx",
          attributes: [
            { key: "ZmVl", value: "MTEzNjI4dXRpYQ==", index: true },
            {
              key: "ZmVlX3BheWVy",
              value:
                "Y2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDk=",
              index: true,
            },
          ],
        },
        {
          type: "tx",
          attributes: [
            {
              key: "YWNjX3NlcQ==",
              value:
                "Y2VsZXN0aWExYXEydDVsMnh5Y3c5NHpneGczMjc2MGg5a2Y0dWhhc3k0Mjkwd24vMg==",
              index: true,
            },
          ],
        },
        {
          type: "tx",
          attributes: [
            {
              key: "c2lnbmF0dXJl",
              value:
                "SkJEUXNObkNkQUowNDZxdUxEejNZMFh4QTRDWTdqNWlzTlRJUHk1QmVvNXpaa21oVVI4dElOVFgxVytMUGNXeDFvUWJYVTkzemQ0Zm8vWi9oZVBxcHc9PQ==",
              index: true,
            },
          ],
        },
        {
          type: "message",
          attributes: [
            {
              key: "YWN0aW9u",
              value: "L2NlbGVzdGlhLmJsb2IudjEuTXNnUGF5Rm9yQmxvYnM=",
              index: true,
            },
          ],
        },
        {
          type: "celestia.blob.v1.EventPayForBlobs",
          attributes: [
            { key: "YmxvYl9zaXplcw==", value: "WzEyMzI5Ml0=", index: true },
            {
              key: "bmFtZXNwYWNlcw==",
              value:
                "WyJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWVOSTllb2gvN3dWSHM9Il0=",
              index: true,
            },
            {
              key: "c2lnbmVy",
              value:
                "ImNlbGVzdGlhMXZkamtjZXRudzM1a3p2dHB3eWU4Z2R0dnhmdThqY21oOHk2ODVlbWN2dWVueWRla3hwNXJqNm14eDM2a3NjdG4weTZyeXdmc3dhaHEwbHF0MzUi",
              index: true,
            },
          ],
        },
      ],
      codespace: "",
    },
    tx: "CqEBCp4BCiAvY2VsZXN0aWEuYmxvYi52MS5Nc2dQYXlGb3JCbG9icxJ6Ci9jZWxlc3RpYTFhcTJ0NWwyeHljdzk0emd4ZzMyNzYwaDlrZjR1aGFzeTQyOTB3bhIdAAAAAAAAAAAAAAAAAAAAAAAAAAeNI9eoh/7wVHsaA5zDByIgAaDgnjW8EJOqlXxa8A66/N65yagHVpJO8GTouMhI87hCAQASmQEKUApGCh8vY29zbW9zLmNyeXB0by5zZWNwMjU2azEuUHViS2V5EiMKIQN+q8D/MuURVcsPAZ8Viw57bu1R3WBcOzl4BwKjWljdSxIECgIIARgCEkUKDgoEdXRpYRIGMTEzNjI4EJStRSIvY2VsZXN0aWExdGx1NDU1dnluOWRrYTI5djJ1bTQ3dWd5eHE5bHllZjJlMmpxZDkaQCQQ0LDZwnQCdOOqriw892NF8QOAmO4+YrDUyD8uQXqOc2ZJoVEfLSDU19Vviz3FsdaEG11Pd83eH6P2f4Xj6qc=",
  },
};
var jsonCode = JSON.stringify(json,null,2)

// Create the editor instance
var editor = monaco.editor.create(document.getElementById('container'), {
    value: jsonCode,
    language: 'json',
	readOnly: true
});

// Add a custom action for the Tab key
editor.addAction({
    id: 'tab-through-values',
    label: 'Tab through values',
    keybindings: [monaco.KeyCode.Tab],
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    run: function(ed) {
    var model = ed.getModel();
    var position = ed.getPosition();
    var lineNumber = position.lineNumber;
    var column = position.column;
    var found = false;

// Function to find the next value on a line
function findNextValue(lineContent, startColumn) {
    var regex = /:\s*([^,}\n]+)/g;
    var match;
    regex.lastIndex = startColumn;  // Start searching from startColumn
    
    if ((match = regex.exec(lineContent)) !== null) {
        var value = match[1].trim();  // Trim whitespace
        var matchStart = match.index + match[0].indexOf(value) + 1;  // +1 to correct offset
        var matchEnd = matchStart + value.length - 1;  // -1 to correct offset
        
        // Adjust matchStart and matchEnd for strings
        if (value.startsWith('"') && value.endsWith('"')) {
            // It's a string, exclude the quotation marks
            matchStart += 1;
            matchEnd -= 1;
            matchStart -= 1;  // Correct off-by-one error
        } else {
            // Correct the offset for numbers and booleans
            matchStart -= 1;
        }
        
        ed.setSelection(
            new monaco.Range(lineNumber, matchStart + 1, lineNumber, matchEnd + 1)  // +1 to convert to 1-based index
        );
        found = true;
    }
}



    // Check the current line for a next value
    findNextValue(model.getLineContent(lineNumber), column - 1);

    // If no next value is found on the current line, check the following lines
    while (!found && lineNumber < model.getLineCount()) {
        lineNumber++;
        findNextValue(model.getLineContent(lineNumber), 0);
    }

    return null;
}
	
});