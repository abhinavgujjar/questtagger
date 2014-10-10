/*
---
name: Facebook Angularjs

description: Provides an easier way to make use of Facebook API with Angularjs

license: MIT-style license

authors:
  - Ciul

requires: [angular]
provides: [facebook]

...
*/
(function(window, angular, undefined) {
    /*global gapi */
    'use strict';

    var fields = "items(description,editable,iconLink,id,properties,title,defaultOpenWithLink,alternateLink, owners(displayName,picture)),nextPageToken";

    var clientId = '335394801683-p18s56v2q0ghp25m1tbk2s3iagicog84.apps.googleusercontent.com';
    //var clientId = '335394801683-tnb7f91o5mv6puetisr9fimvppo24l2u.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive profile email https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.readonly';

    // Module global loadDeferred
    var loadDeferred;

    var sample = [{
        "id": "0BxHZTpcWRBHiTWFrQmZEYmcxZ00",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiTWFrQmZEYmcxZ00/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
        "title": "C# Net Outline.docx",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true,
        "properties": [{
            "kind": "drive#property",
            "etag": "\"ysueZUkrDgRXGY22AYAOH6Xl_qU/tcjupluoDUwkNTcD5sOXCgJh7zg\"",
            "key": "education",
            "visibility": "PUBLIC",
            "value": "QTAG"
        }]
    }, {
        "id": "1Z25PnUxD6xnw9G9u11t4FhXCX4hEbIoNH8dPaTRzBNM",
        "alternateLink": "https://docs.google.com/document/d/1Z25PnUxD6xnw9G9u11t4FhXCX4hEbIoNH8dPaTRzBNM/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1Z25PnUxD6xnw9G9u11t4FhXCX4hEbIoNH8dPaTRzBNM/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Testing Plan",
        "owners": [{
            "displayName": "Gauri Sanghi",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-ZpVioWJMdSc/AAAAAAAAAAI/AAAAAAAAABs/6Dhc4kFGSdc/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1xph3Qgj34ChROJQxvwrJMMdWEV7y5fW32nbHeovsu8g",
        "alternateLink": "https://docs.google.com/document/d/1xph3Qgj34ChROJQxvwrJMMdWEV7y5fW32nbHeovsu8g/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1xph3Qgj34ChROJQxvwrJMMdWEV7y5fW32nbHeovsu8g/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "project names for tagging",
        "owners": [{
            "displayName": "Gauri Sanghi",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-ZpVioWJMdSc/AAAAAAAAAAI/AAAAAAAAABs/6Dhc4kFGSdc/s64/photo.jpg"
            }
        }],
        "editable": true,
        "properties": [{
            "kind": "drive#property",
            "etag": "\"ysueZUkrDgRXGY22AYAOH6Xl_qU/LmhJ67er6r4GOGIKA4XEChncGBM\"",
            "key": "technology",
            "visibility": "PUBLIC",
            "value": "QTAG"
        }]
    }, {
        "id": "0B0pZew86Q6vJcFcwV283Q2FHa2M",
        "alternateLink": "https://docs.google.com/folderview?id=0B0pZew86Q6vJcFcwV283Q2FHa2M&usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
        "title": "QA knowledge archive",
        "owners": [{
            "displayName": "Gauri Sanghi",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-ZpVioWJMdSc/AAAAAAAAAAI/AAAAAAAAABs/6Dhc4kFGSdc/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1A4eJ9gZQvNqSPOsjdqn6HG5uurr3KK0Z5VfNA9YmDQQ",
        "alternateLink": "https://docs.google.com/spreadsheets/d/1A4eJ9gZQvNqSPOsjdqn6HG5uurr3KK0Z5VfNA9YmDQQ/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/spreadsheets/d/1A4eJ9gZQvNqSPOsjdqn6HG5uurr3KK0Z5VfNA9YmDQQ/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
        "title": "AngularJS Post-Assesment - Nous (Responses)",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true,
        "properties": [{
            "kind": "drive#property",
            "etag": "\"ysueZUkrDgRXGY22AYAOH6Xl_qU/LmhJ67er6r4GOGIKA4XEChncGBM\"",
            "key": "technology",
            "visibility": "PUBLIC",
            "value": "QTAG"
        }]
    }, {
        "id": "12jcx08GYZIy0lfQ-3JY0-6gb0P6OVSAQdP_AJcKkAPY",
        "alternateLink": "https://docs.google.com/document/d/12jcx08GYZIy0lfQ-3JY0-6gb0P6OVSAQdP_AJcKkAPY/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/12jcx08GYZIy0lfQ-3JY0-6gb0P6OVSAQdP_AJcKkAPY/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Trainer Portal",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1f5VWROeTI2kJwVKbNsrHuEz5IqtZe14OpoxM9fEYJNU",
        "alternateLink": "https://docs.google.com/document/d/1f5VWROeTI2kJwVKbNsrHuEz5IqtZe14OpoxM9fEYJNU/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1f5VWROeTI2kJwVKbNsrHuEz5IqtZe14OpoxM9fEYJNU/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Templating",
        "owners": [{
            "displayName": "Miško Hevery",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-t9SJPTtvPZQ/AAAAAAAAAAI/AAAAAAAAS6I/OF58UIXVUC8/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiMDhISU9BUm1TT3c",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMDhISU9BUm1TT3c/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AXIS BANK Statement for September 2014.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1gBh7ka9QZXIN1b0n2Aj3X8-mLdNjWCyld3sd7cM3a8k",
        "alternateLink": "https://docs.google.com/document/d/1gBh7ka9QZXIN1b0n2Aj3X8-mLdNjWCyld3sd7cM3a8k/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1gBh7ka9QZXIN1b0n2Aj3X8-mLdNjWCyld3sd7cM3a8k/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Being DOM vs rendering via DOM",
        "owners": [{
            "displayName": "Igor Minar",
            "picture": {
                "url": "https://lh5.googleusercontent.com/-M400EqeKd7I/AAAAAAAAAAI/AAAAAAABLXI/7i95mXbBvmQ/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
        "alternateLink": "https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "ES6 +A: Angular v2.0 extensions to ES6 Traceur",
        "owners": [{
            "displayName": "Miško Hevery",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-t9SJPTtvPZQ/AAAAAAAAAAI/AAAAAAAAS6I/OF58UIXVUC8/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiUHV1MTJyZ0hKNW8",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiUHV1MTJyZ0hKNW8/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "LMS_wireframes_v03_5.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiS0lSWldXMFpLQmM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiS0lSWldXMFpLQmM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_9_archive_list.png",
        "title": "Wireframes_Lisi_Feb11.zip",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidTB2S1NNSHVDeDQ",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidTB2S1NNSHVDeDQ/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
        "title": "Sponsor Commitment letter.doc",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1gGUEODxxDjY7azF8InqtN1pRcLo3WhGb8BcoIihyI80",
        "alternateLink": "https://docs.google.com/document/d/1gGUEODxxDjY7azF8InqtN1pRcLo3WhGb8BcoIihyI80/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1gGUEODxxDjY7azF8InqtN1pRcLo3WhGb8BcoIihyI80/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "diary.js",
        "owners": [{
            "displayName": "Igor Minar",
            "picture": {
                "url": "https://lh5.googleusercontent.com/-M400EqeKd7I/AAAAAAAAAAI/AAAAAAABLXI/7i95mXbBvmQ/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiUGRHWThONEZRVHM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiUGRHWThONEZRVHM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiNEpaSGJTczB1RzQ",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiNEpaSGJTczB1RzQ/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "1283935-XXXXXXX-560076.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1lY305IASkb0NWSUT2JG9_wmnlvJXd3cgRxHX6zgweig",
        "alternateLink": "https://docs.google.com/document/d/1lY305IASkb0NWSUT2JG9_wmnlvJXd3cgRxHX6zgweig/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1lY305IASkb0NWSUT2JG9_wmnlvJXd3cgRxHX6zgweig/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "MyQuest roadmap",
        "owners": [{
            "displayName": "Gauri Sanghi",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-ZpVioWJMdSc/AAAAAAAAAAI/AAAAAAAAABs/6Dhc4kFGSdc/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidThEbS16UVExNjA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidThEbS16UVExNjA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0132 Nishitha.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiaEhvLWt6aDBFTUU",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiaEhvLWt6aDBFTUU/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0158 Monica.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHibW4zUWlJUFVGdk0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHibW4zUWlJUFVGdk0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0175 Sherly.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHicE1Ua2Z2VTFUNWc",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHicE1Ua2Z2VTFUNWc/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0170 Anil Kumar.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMFVmUFRuRWdISnM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMFVmUFRuRWdISnM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0157 Sunil.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiT0d4UERlV0huSDA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiT0d4UERlV0huSDA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "PAAP Concept Note Final.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMHdwdGxhN1g3TTQ",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMHdwdGxhN1g3TTQ/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_excel_list.png",
        "title": "UUPP MIS - Changes Required.xls",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0B0pZew86Q6vJaHMyX2VqdnVBZmQwUE1DcUZtNmktV0VHUnRN",
        "alternateLink": "https://docs.google.com/file/d/0B0pZew86Q6vJaHMyX2VqdnVBZmQwUE1DcUZtNmktV0VHUnRN/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "QA tagging structure.pdf",
        "owners": [{
            "displayName": "Gauri Sanghi",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-ZpVioWJMdSc/AAAAAAAAAAI/AAAAAAAAABs/6Dhc4kFGSdc/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHielEwSEl5QldVYVE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHielEwSEl5QldVYVE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidHl4UkRGRU5pNk0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidHl4UkRGRU5pNk0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidVFSYjNsXy1fVG8",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidVFSYjNsXy1fVG8/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMVJZTXd2TVliMWJIakNCZllyNzZ1QXZiODBR",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMVJZTXd2TVliMWJIakNCZllyNzZ1QXZiODBR/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "AAP0125 Ramesh.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHieFoxa0RKb0Y2Mlk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHieFoxa0RKb0Y2Mlk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "TahirehLal_Invite.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1ATJXHewEIPcA0z2mOIX-bxwTekqxFS3MggoGXdZM2vY",
        "alternateLink": "https://docs.google.com/document/d/1ATJXHewEIPcA0z2mOIX-bxwTekqxFS3MggoGXdZM2vY/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1ATJXHewEIPcA0z2mOIX-bxwTekqxFS3MggoGXdZM2vY/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Rahul Interview",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1L-9bBL-smMrAmxC_pVBdKWKcB-ZlOLTj-jmzAJ2jKeE",
        "alternateLink": "https://docs.google.com/document/d/1L-9bBL-smMrAmxC_pVBdKWKcB-ZlOLTj-jmzAJ2jKeE/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1L-9bBL-smMrAmxC_pVBdKWKcB-ZlOLTj-jmzAJ2jKeE/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "WebComponents",
        "owners": [{
            "displayName": "Miško Hevery",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-t9SJPTtvPZQ/AAAAAAAAAAI/AAAAAAAAS6I/OF58UIXVUC8/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiVTBnUXF1aENHNkU",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiVTBnUXF1aENHNkU/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMWQyLWpBbG03Mm8",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMWQyLWpBbG03Mm8/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "eStatement4482IN_2014-09-30_0808.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiNF9fOFRoX3BEZzg",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiNF9fOFRoX3BEZzg/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiYUdoR1J1R0Ric0E",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiYUdoR1J1R0Ric0E/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiN0JpNUZjNDNuOFk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiN0JpNUZjNDNuOFk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "E-Letter.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiY0pTNVo4T3JyYkk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiY0pTNVo4T3JyYkk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "Statement_2014MTH09_8315186.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiaVlYeVJXeG5DMDA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiaVlYeVJXeG5DMDA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "1280349-XXXXXXX-560076.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHicXllaU5zdzdVS2M",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHicXllaU5zdzdVS2M/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1u4UQVPXXyds62c60_PslJjc7dxUBdOYvO_ZeM2tyrSU",
        "alternateLink": "https://docs.google.com/document/d/1u4UQVPXXyds62c60_PslJjc7dxUBdOYvO_ZeM2tyrSU/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1u4UQVPXXyds62c60_PslJjc7dxUBdOYvO_ZeM2tyrSU/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "ngEurope: Routing in Angular 2.0",
        "owners": [{
            "displayName": "Rob Eisenberg",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-omcVq8jw6-M/AAAAAAAAAAI/AAAAAAAAAEs/drSK67jocPA/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "1xaBPLLkk1gUI66-3OhNT8mR_QDrJL4EFqw28_5s0WMs",
        "alternateLink": "https://docs.google.com/document/d/1xaBPLLkk1gUI66-3OhNT8mR_QDrJL4EFqw28_5s0WMs/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1xaBPLLkk1gUI66-3OhNT8mR_QDrJL4EFqw28_5s0WMs/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "High Level Design Considerations",
        "owners": [{
            "displayName": "Rob Eisenberg",
            "picture": {
                "url": "https://lh3.googleusercontent.com/-omcVq8jw6-M/AAAAAAAAAAI/AAAAAAAAAEs/drSK67jocPA/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "1xg6y9tBY7U-qOcYlhAEd89kMPIGXWVs1xsgc0zC1Hv8",
        "alternateLink": "https://docs.google.com/document/d/1xg6y9tBY7U-qOcYlhAEd89kMPIGXWVs1xsgc0zC1Hv8/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1xg6y9tBY7U-qOcYlhAEd89kMPIGXWVs1xsgc0zC1Hv8/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Templating Design Decisions",
        "owners": [{
            "displayName": "Igor Minar",
            "picture": {
                "url": "https://lh5.googleusercontent.com/-M400EqeKd7I/AAAAAAAAAAI/AAAAAAABLXI/7i95mXbBvmQ/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiYXNqVEZ3Y2lkQkk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiYXNqVEZ3Y2lkQkk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiOVp5VGVHZThVR2c",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiOVp5VGVHZThVR2c/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "invoice43911332.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMFVsWUk1NDNBSXM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMFVsWUk1NDNBSXM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "IMAG0160.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidUxVUUhsM0RVOUE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidUxVUUhsM0RVOUE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "IMAG0161.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiSjFzRW5NRXIzUlE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiSjFzRW5NRXIzUlE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "IMG_3111.JPG",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidlBkc2Q3QkhQa1k",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidlBkc2Q3QkhQa1k/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "IMG_3118.JPG",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiR2FpdUx6Y1o1OU0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiR2FpdUx6Y1o1OU0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiUmItV2dLS0s1MXM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiUmItV2dLS0s1MXM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1kpuR512G1b0D8egl9245OHaG0cFh0ST0ekhD_g8sxtI",
        "alternateLink": "https://docs.google.com/document/d/1kpuR512G1b0D8egl9245OHaG0cFh0ST0ekhD_g8sxtI/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1kpuR512G1b0D8egl9245OHaG0cFh0ST0ekhD_g8sxtI/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Databinding with Web Components",
        "owners": [{
            "displayName": "Miško Hevery",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-t9SJPTtvPZQ/AAAAAAAAAAI/AAAAAAAAS6I/OF58UIXVUC8/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiYzZTYVZzZUNPZDg",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiYzZTYVZzZUNPZDg/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiM0JzM3FLTjhET2M",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiM0JzM3FLTjhET2M/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHibF9hbjRyTXBEam8",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHibF9hbjRyTXBEam8/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiZ0Y2eC1MRFpfMU0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiZ0Y2eC1MRFpfMU0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_9_archive_list.png",
        "title": "6L061_STMT~03727930_20140930.htm.zip",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1je68EfKqPH9FcOrSqShZzVSYQpvV93p8ZEljBzDsHDw",
        "alternateLink": "https://docs.google.com/document/d/1je68EfKqPH9FcOrSqShZzVSYQpvV93p8ZEljBzDsHDw/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1je68EfKqPH9FcOrSqShZzVSYQpvV93p8ZEljBzDsHDw/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Templating Examples",
        "owners": [{
            "displayName": "Tobias Bosch",
            "picture": {
                "url": "https://lh4.googleusercontent.com/-y7KjJTehFaE/AAAAAAAAAAI/AAAAAAAAAX8/Gs_mlUyCbd0/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiek02YkJ5OUxxYUE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiek02YkJ5OUxxYUE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "White Fang by Jack London.epub",
        "description": "A Project Gutenberg Ebook",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiNVRSdFBQeDE2ZnM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiNVRSdFBQeDE2ZnM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "White Fang by Jack London.mobi",
        "description": "A Project Gutenberg Ebook",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiM3NYc0Fzd3pncmM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiM3NYc0Fzd3pncmM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiaURFeFRGSkpYRk0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiaURFeFRGSkpYRk0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Car Audio.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiYm1sRlA3aDNocE0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiYm1sRlA3aDNocE0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Head Phones.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiaWNFN2R4VXpZM00",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiaWNFN2R4VXpZM00/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Home Audio.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiWFRXcTNUZE5JRXc",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiWFRXcTNUZE5JRXc/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Speakers & Docks.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiN1lzTGpxVHlUYnM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiN1lzTGpxVHlUYnM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Wireless.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiX05CQVh3NzJVaEk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiX05CQVh3NzJVaEk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1y2p_MJ24ho087q8aKOTLRy0HxbwavYpgMIk8ad1QJrA",
        "alternateLink": "https://docs.google.com/document/d/1y2p_MJ24ho087q8aKOTLRy0HxbwavYpgMIk8ad1QJrA/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1y2p_MJ24ho087q8aKOTLRy0HxbwavYpgMIk8ad1QJrA/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Deepak Sharma Discussion",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "16Z6Lun15DoWNrE2imk7N-2WiRAaqc954LOfU2-2JSoI",
        "alternateLink": "https://docs.google.com/document/d/16Z6Lun15DoWNrE2imk7N-2WiRAaqc954LOfU2-2JSoI/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/16Z6Lun15DoWNrE2imk7N-2WiRAaqc954LOfU2-2JSoI/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Touch Animations",
        "owners": [{
            "displayName": "Tobias Bosch",
            "picture": {
                "url": "https://lh4.googleusercontent.com/-y7KjJTehFaE/AAAAAAAAAAI/AAAAAAAAAX8/Gs_mlUyCbd0/s64/photo.jpg"
            }
        }],
        "editable": false
    }, {
        "id": "0BxHZTpcWRBHiblB5VlljUmtnNFk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiblB5VlljUmtnNFk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHid0xmbWNOQlpXdVU",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHid0xmbWNOQlpXdVU/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiSTBBWmNLZEVxWnM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiSTBBWmNLZEVxWnM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiejRYdWR3enNLYm8",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiejRYdWR3enNLYm8/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiZTAwRmlvTWpFSTQ",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiZTAwRmlvTWpFSTQ/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "Job Description – IT Consultant.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1rQXXKvliUz97rGW2CVKS-9UEt0tqw6mHA2hgUrYuW6Y",
        "alternateLink": "https://docs.google.com/spreadsheets/d/1rQXXKvliUz97rGW2CVKS-9UEt0tqw6mHA2hgUrYuW6Y/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/spreadsheets/d/1rQXXKvliUz97rGW2CVKS-9UEt0tqw6mHA2hgUrYuW6Y/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
        "title": "Furniture",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1oz31r9Sr_Sjc4d5XSXgBMfvtyeYbXftPsWgkOxO7wJI",
        "alternateLink": "https://docs.google.com/spreadsheets/d/1oz31r9Sr_Sjc4d5XSXgBMfvtyeYbXftPsWgkOxO7wJI/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/spreadsheets/d/1oz31r9Sr_Sjc4d5XSXgBMfvtyeYbXftPsWgkOxO7wJI/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
        "title": "MArking AngularJS Post-Assesment - Nous (Responses)",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidnhOcG9GQk5SYzA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidnhOcG9GQk5SYzA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Elaine Ghosh - Packing List - STO 4.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiTVZLTERhcE51Q0k",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiTVZLTERhcE51Q0k/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Elaine Ghosh - Packing List - STO 1.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHibFp6Q1k0S0lwRTA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHibFp6Q1k0S0lwRTA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Elaine Ghosh - Packing List - STO 2.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiUW5PRlF6ZDRzV1E",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiUW5PRlF6ZDRzV1E/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "Elaine Ghosh - Packing List - STO 3.jpg",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1hIZzgqOUL-oTcw8adax4gxF9tqcFlmv9nC0tQ-T9EoY",
        "alternateLink": "https://docs.google.com/forms/d/1hIZzgqOUL-oTcw8adax4gxF9tqcFlmv9nC0tQ-T9EoY/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/forms/d/1hIZzgqOUL-oTcw8adax4gxF9tqcFlmv9nC0tQ-T9EoY/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
        "title": "Copy of AngularJS Post-Assesment - Nous",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiRkVDV1N6c2t3SGc",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiRkVDV1N6c2t3SGc/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1TuNFGOnYnlkk7zJY-kgKFLu-8o-WHCZnj8EjGbWSDDQ",
        "alternateLink": "https://docs.google.com/document/d/1TuNFGOnYnlkk7zJY-kgKFLu-8o-WHCZnj8EjGbWSDDQ/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1TuNFGOnYnlkk7zJY-kgKFLu-8o-WHCZnj8EjGbWSDDQ/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Pool Circle",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHicWstM29YZU1CaU0",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHicWstM29YZU1CaU0/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiTzJyZDBFX1ZEdkE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiTzJyZDBFX1ZEdkE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiZ3ZRaXNBWGU1OHM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiZ3ZRaXNBWGU1OHM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidWhqLUlhMDlZTEk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHidWhqLUlhMDlZTEk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHia0pWdTFMQlZMYVE",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHia0pWdTFMQlZMYVE/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
        "title": "Prashant_Peres.doc",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1ewX-AvxTCJa99qIbFB38IgsHIZbdzKm1Zjtr-sG5iQM",
        "alternateLink": "https://docs.google.com/forms/d/1ewX-AvxTCJa99qIbFB38IgsHIZbdzKm1Zjtr-sG5iQM/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/forms/d/1ewX-AvxTCJa99qIbFB38IgsHIZbdzKm1Zjtr-sG5iQM/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
        "title": "AngularJS Post-Assesment - Nous",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "13SPp_jGEI5j1e34PkvV7tfcQGSSUI8hw9yH9mPWfpmA",
        "alternateLink": "https://docs.google.com/spreadsheets/d/13SPp_jGEI5j1e34PkvV7tfcQGSSUI8hw9yH9mPWfpmA/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/spreadsheets/d/13SPp_jGEI5j1e34PkvV7tfcQGSSUI8hw9yH9mPWfpmA/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
        "title": "AngularJS Post-Assesment (Responses)",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "16K-xX-prpMKrp_1HCHbEWsVViB9_0HdgqJCIzgY2HvI",
        "alternateLink": "https://docs.google.com/forms/d/16K-xX-prpMKrp_1HCHbEWsVViB9_0HdgqJCIzgY2HvI/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/forms/d/16K-xX-prpMKrp_1HCHbEWsVViB9_0HdgqJCIzgY2HvI/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
        "title": "AngularJS Post-Assesment",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHid1hfYkpVcC1VVjA",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHid1hfYkpVcC1VVjA/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
        "title": "logo.png",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1scLQosZlw7lrMNN8uVXS2sW6iFaVRL_DEIFIzSdwzVg",
        "alternateLink": "https://docs.google.com/document/d/1scLQosZlw7lrMNN8uVXS2sW6iFaVRL_DEIFIzSdwzVg/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/document/d/1scLQosZlw7lrMNN8uVXS2sW6iFaVRL_DEIFIzSdwzVg/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
        "title": "Angular Nous Sep 26/27",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiTWJyR2VFcTJoNGc",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiTWJyR2VFcTJoNGc/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiSkpGeWlZSXZRdEk",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiSkpGeWlZSXZRdEk/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiWk5YUHB1WjViZ28",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiWk5YUHB1WjViZ28/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiRlp3WFRIR1VNbF9kNGRqQmphRVpwQ2JLdE84",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiRlp3WFRIR1VNbF9kNGRqQmphRVpwQ2JLdE84/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
        "title": "PAAP Concept Note.pdf",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHiMWFZSmxjT2tCOHM",
        "alternateLink": "https://docs.google.com/file/d/0BxHZTpcWRBHiMWFZSmxjT2tCOHM/edit?usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
        "title": "meetup.ics",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "1WSIrFE95DmfX_h_M8tl6pM3O84ktJsGf6OgGULtM1UE",
        "alternateLink": "https://docs.google.com/spreadsheets/d/1WSIrFE95DmfX_h_M8tl6pM3O84ktJsGf6OgGULtM1UE/edit?usp=drivesdk",
        "defaultOpenWithLink": "https://docs.google.com/spreadsheets/d/1WSIrFE95DmfX_h_M8tl6pM3O84ktJsGf6OgGULtM1UE/edit?usp=drive_web",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
        "title": "Untitled spreadsheet",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }, {
        "id": "0BxHZTpcWRBHidDl5MHlKaUUxem8",
        "alternateLink": "https://docs.google.com/folderview?id=0BxHZTpcWRBHidDl5MHlKaUUxem8&usp=drivesdk",
        "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
        "title": "Training",
        "owners": [{
            "displayName": "Abhinav Gujjar",
            "picture": {
                "url": "https://lh6.googleusercontent.com/-aR8lyDqQQio/AAAAAAAAAAI/AAAAAAAAASg/tNikwwTEWIY/s64/photo.jpg"
            }
        }],
        "editable": true
    }]



    angular.module('tjGoog', []).

    factory('goog', ['$q',

        function($q) {
            var userProfile = {};
            var isSigndIn = false;

            function retrieveAllFiles() {


                var deferred = $q.defer();
                var retrievePageOfFiles = function(request, result) {
                    request.execute(function(resp) {
                        if (!resp || !resp.nextPageToken) {
                            deferred.resolve(result);

                        } else {
                            result = result.concat(resp.items);

                            deferred.notify(result.length);

                            var nextPageToken = resp.nextPageToken;
                            if (nextPageToken) {
                                request = gapi.client.drive.files.list({
                                    'pageToken': nextPageToken,
                                    fields: fields
                                });
                                retrievePageOfFiles(request, result);
                            }
                        }
                    });
                }

                var initialRequest = gapi.client.drive.files.list({
                    fields: fields
                });
                retrievePageOfFiles(initialRequest, []);


                return deferred.promise;
            }

            function signIn() {
                var gapi;
                return loadDeferred.promise.then(function(_api) {
                    gapi = _api;
                    var deferred = $q.defer();

                    if (!isSigndIn) {
                        gapi.auth.authorize({
                            client_id: clientId,
                            scope: scopes,
                            immediate: false
                        }, function(authResult) {
                            isSigndIn = true;
                            deferred.resolve(authResult);
                        });

                    } else {
                        deferred.resolve(true);

                    }

                    return deferred.promise;
                }).then(function(authResult) {


                    var deferred = $q.defer();

                    gapi.client.load('plus', 'v1', function() {
                        if (authResult.access_token) {
                            deferred.resolve(authResult);
                        } else if (authResult.error) {
                            deferred.reject(authResult.error);
                        }
                    });

                    return deferred.promise;

                }).then(function() {
                    var deferred = $q.defer();

                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });

                    request.execute(function(profile) {

                        if (profile.error) {
                            deferred.reject(profile.error);
                        }

                        userProfile = profile;

                        if (profile.emails) {
                            angular.forEach(profile.emails, function(item) {
                                if (item.type === 'account') {
                                    userProfile.defaultEmail = item.value;
                                }
                            })
                        }
                        deferred.resolve(userProfile);

                    });

                    return deferred.promise;
                }).then(function() {
                    var deferred = $q.defer();

                    gapi.client.load('drive', 'v2', function() {
                        deferred.resolve();

                    });
                    return deferred.promise;

                });
            }

            function search(filterTags) {
                var deferred = $q.defer();

                var query = '';
                var first = true;
                angular.forEach(filterTags, function(ftag) {
                    if (!first) {
                        query += ' or ';
                    }

                    query += "(properties has { key='" + ftag.key + "' and value='QTAG' and visibility='PUBLIC' })";

                    first = false;
                });

                var request = gapi.client.drive.files.list({
                    q: query
                });

                request.execute(function(result) {
                    if (result.error) {
                        deferred.reject(result.error);
                    } else {
                        deferred.resolve(result.items);
                    }


                });

                return deferred.promise;
            }

            function removeProperty(gapi, fileId, key) {
                var deferred = $q.defer();

                var request = gapi.client.drive.properties.delete({
                    'fileId': fileId,
                    'propertyKey': key,
                    'visibility': 'PUBLIC'
                });

                request.execute(function(resp) {
                    deferred.resolve(resp.result);
                });

                return deferred.promise;
            }

            function insertProperty(gapi, fileId, key, value, visibility) {
                var deferred = $q.defer();

                var body = {
                    'key': key,
                    'value': value,
                    'visibility': visibility
                };

                var request = gapi.client.drive.properties.insert({
                    'fileId': fileId,
                    'resource': body
                });
                request.execute(function(resp) {
                    deferred.resolve(resp.result);
                });

                return deferred.promise;
            }

            return {
                signIn: signIn,
                ready: loadDeferred.promise,
                search: search,
                insertProperty: insertProperty,
                removeProperty: removeProperty,
                retrieveAllFiles: retrieveAllFiles,
                sample: sample,
                getUserProfile: function() {
                    return userProfile;
                }
            };
        }
    ]).

    run([
        '$q',
        function($q) {
            // Define global loadDeffered to notify when Service callbacks are safe to use
            loadDeferred = $q.defer();


            /**
             * SDK script injecting
             */
            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/client:plusone.js';
                var s = document.getElementsByTagName('script')[0];
                po.onload = function() {
                    loadDeferred.resolve(gapi);
                };

                s.parentNode.insertBefore(po, s);
            })();


        }
    ]);

})(window, angular);