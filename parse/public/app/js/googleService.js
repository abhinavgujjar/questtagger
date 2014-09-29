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

    var fields = "items(description,editable,iconLink,id,properties,title),nextPageToken";

    var clientId = '335394801683-p18s56v2q0ghp25m1tbk2s3iagicog84.apps.googleusercontent.com';
    // var clientId = '335394801683-tnb7f91o5mv6puetisr9fimvppo24l2u.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/drive profile email';

    // Module global loadDeferred
    var loadDeferred;

    var sample =
        [{
            "id": "1QhaIEUvrid4RpbgNUxfNFTucoObnxIj28Ie9kHi7e8M",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_presentation_list.png",
            "title": "AngularJs",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiNGJJMEhQQTlvYWFoTEpESUcwZUhYMEdKLWxB",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_powerpoint_list.png",
            "title": "AngularJs.pptx",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiVzRzQTRqT3V3aGc",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP-CDS-.net dev-Abhinav__1408963501225.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiN2VqZkRBUmwycU0",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-SD-415-Abhinav-NEC India-Bangalore__1408963501259.pdf",
            "editable": true
        }, {
            "id": "1UCfA8hl6yaxYS59R3h86losI5UJRd2L3xRMTdAVNpCo",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Nous Angular Advanced.doc",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHicWRvVkRXRkdGRjVDaEhxNWVTVUhtaE5wWldn",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "angular-advanced.doc",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHieEZ0aVFNZldxZ3c",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-SD-415-Abhinav-NEC India-Bangalore__1408949090247.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiLWREVEh3a2hjRnM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP-CDS-.net dev-Abhinav__1408949090263.pdf",
            "editable": true
        }, {
            "id": "11NVuUpVCp5z8B_QgD9VqOY919mbpMSfZ5Gjh2ZPpoxc",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Data Tool Documentation",
            "description": "{\"ctags\":[{\"ctag\":\"some\"}]}",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/Q1ir2R9sCjB9KffidN_wzoARSbI\"",
                "key": "document",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/pX4OEDwjVULqpRuHluBIEnPJYvU\"",
                "key": "QTAGt6w4v",
                "visibility": "PUBLIC",
                "value": "doc"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/11X6Jy8yD6hRKWyVXGjx2EJnHuo\"",
                "key": "QTAG",
                "visibility": "PUBLIC",
                "value": "qa"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/B4DjzyCUafcctbvVqyQzOJUdsjM\"",
                "key": "QTAGzllyx",
                "visibility": "PUBLIC",
                "value": "some"
            }]
        }, {
            "id": "1maJveSC1A6y9WQSotIBT2kCR80dytwjZvs9STgMBl08",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Trade",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiUlRZdEg3X2xGS2M",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-AR-574 Cassandra-Technicolor-Bangalore-Abhishek-140902__1408692420577.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHidFdBbmJxdFdQMm8",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "CDS - Cassandra__1408692420583.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiZGNUOEpab0FPVEk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "1.jpg",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiVnc5X0x2Y1RTLUk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "3.jpg",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiSjVXcE53VGk3ak0",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "Anks (2) (1).pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHidi1Ob0tEcnJLcHc",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "Programs Director JD.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiMDRRSzJ6RnBhZnM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-AS-474 Abhinav- Angular .Js + Bootstrap- MindTree- Bangalore- 210814__1408621067334.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHidUlZNlFCd0stNFE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP CDS - Advance Angular & Bootstrap__1408621067353.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiQWtGdS1MOTVUXzg",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP CDS - Angular .Js__1408613350131.pdf",
            "editable": true
        }, {
            "id": "16wxxCLSOzr3va0crl3FVcy5RB7Mp-uA4Gm4Hv3CTrGY",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "TOR_Meghalaya Component 1 A_Aug 14.docx",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/PIs8fpN7-yPzJ0KIUNGU8r543co\"",
                "key": "workflow",
                "visibility": "PUBLIC",
                "value": "[{\"person\":\"sdfa\"},{\"person\":\"sdfa\"}]"
            }]
        }, {
            "id": "0BxHZTpcWRBHiRVkwaXRvZmZLbUE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "MobilityStudy.pdf",
            "description": "{\"approval\":{\"approvers\":\"1\",\"attachedFiles\":[],\"lastModified\":\"2014-08-20\",\"status\":\"REVIEW\",\"ccLine\":[],\"link\":\"/jsp/collavate/view?id=HuItEwUWSMyZoDlHPzqOJQ\",\"currentApprover\":\"aputooot@gmail.com\",\"submitted\":\"2014-08-20\",\"type\":\"APPROVAL_DOCS__O3q2EaRPS1C75I8Ou08CjQ\",\"claimedId\":\"http://gmail.com/108409085321204391715\",\"version\":\"2.2\",\"retainPermissions\":\"false\",\"currentApproverClaimedId\":\"aputooot@gmail.com\",\"sender\":\"abhinavgujjar\",\"id\":\"HuItEwUWSMyZoDlHPzqOJQ\",\"primaryFileId\":\"0BxHZTpcWRBHiRVkwaXRvZmZLbUE\",\"netkiller_Docs URL\":\"https://document.collavate.com/jsp/collavate/view?id=HuItEwUWSMyZoDlHPzqOJQ\",\"references\":[],\"approverLine\":[{\"share\":\"aputooot@gmail.com\"}],\"currentApproverFullName\":\"aputooot@gmail.com\",\"senderFullName\":\"Abhinav Gujjar\",\"referenceFiles\":[],\"cc\":\"0\"}}",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/VNu9RzRopo-uSF_PnaY5U1oeTZ8\"",
                "key": "another",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/FnQ8N3iTtJ4gi6R5d0R5rgGZo0U\"",
                "key": "mobility",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/b6fHffePwLMytb06qXOp1DBS0Sg\"",
                "key": "qa",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/4dbfCGyuKhLe2tcceFV2XMUDTms\"",
                "key": "workflow",
                "visibility": "PUBLIC",
                "value": "true"
            }]
        }, {
            "id": "0BxHZTpcWRBHiVEJRN25HSG9RVFk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
            "title": "COLLAVATE",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/l4hk9cH0eTbhjf5V0n82Wd5qH7M\"",
                "key": "coll",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHiM2txZ0xCbFVCUVE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-AS-473 Abhinav- Angular .Js- EMC- Bangalore- 200814__1408518267872.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/7RJNzevd8IVrpw6Oa-BgVf-am4w\"",
                "key": "workflow",
                "visibility": "PUBLIC",
                "value": "[{\"person\":\"abhinavgujjar@gmail.com\"}]"
            }]
        }, {
            "id": "0BxHZTpcWRBHidDFoSVV3dWJPdGs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP CDS - Angular .Js__1408518267912.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiSE5qczhmTmF2aG8",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Course outline on KENDO UI.docx",
            "editable": true
        }, {
            "id": "1ixPeE7MjJkDzKV8h3c_NXDl46X1vLqg8zbijEpL0FFo",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "TOR_Meghalaya Component 1 A_Aug 14.docx",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiQUVvbkduMjdMOTdqTWJXVUlYT0RBODVjM3k4",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "TOR_Meghalaya Component 1 A_Aug 14.docx",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiN3NWOWJtUmc5cHM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "TOR_Meghalaya Component 1 A_Aug 14.docx",
            "editable": true
        }, {
            "id": "1cXTPVFyJfbDEJrW78C4-AoiZ6hT1ta8wT1Xe0nT_-mU",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Angular Training - EMC2",
            "editable": true
        }, {
            "id": "1kcwKBk6Ldt9CyQ9D4YNAXGWVwheryU1x1pY_AkkhlKs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Copy of angular-advanced.doc",
            "editable": true
        }, {
            "id": "1Tp7A3WnSvygGw67Yv-NOvVKQAlQqpzxSFM1ieqES66E",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "mumbai votes workflow",
            "editable": true
        }, {
            "id": "18dN6925uAmWlVPFtsQ4_-28kG-oo4oCXMY7A8lCBN_s",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Job Seeker Survey (Responses)",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/g5L_y09CgPWiCXsM7D3XTlTcPtY\"",
                "key": "survey",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHiX3ZuTzBhZlZnb3c",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "logo.png",
            "editable": true
        }, {
            "id": "1zFuF7rYcuKBlJRyYCYwk73VTHM0suosi0TQjUxv2lfs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Unit Testing and TDD.doc",
            "editable": true
        }, {
            "id": "1PmDMj7Mmp-ftgi6oKHKFvEmTGHmT3lJMKVJYuA5n-HY",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
            "title": "Untitled form",
            "editable": true
        }, {
            "id": "1RO2gMY3xN5_92ZZwsEN6pgYhFgIFZbNVMXYpti6jkQ4",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Untitled spreadsheet",
            "editable": true
        }, {
            "id": "1_xzeIL5hylqxY9hR6LyZgJ3HMtC0gqXc7hXIBF_f8fU",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "TJ Survey (Responses)",
            "editable": true
        }, {
            "id": "177t6-z2gcuLwPQ_AgnlpSrXvGOIc3QZtEzeJCAgIBx0",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
            "title": "TJ Survey",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHibXVCOXJ5WkJfWGs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
            "title": "signature.asc",
            "editable": true
        }, {
            "id": "1Irz8zNyMqOt45465hDD9gfUROx8vSuAbv8IgDC4LEJ0",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Untitled document",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiMERmQWMyYklzY2c",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "4477 XXXX XXXX 9005-179149.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/GNSEgpBVXS_joM2lMYEBMjXZrdM\"",
                "key": "bank",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "1szwPdVC27JgxQ9U5xI76IiIoVDqt1fM66ExFjfy_BZM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Untitled document",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiQVlfR01NUHRmNWpCTTgyQnlERkFjTWZiSTBF",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_powerpoint_list.png",
            "title": "Unit Testing.pptx",
            "description": "{\"ctags\":[{\"ctag\":\"presenta\"}]}",
            "editable": true
        }, {
            "id": "1JXlGHhhruOSjXHdG9BNQXHVdA385NJ_klOgXJNh22yE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_presentation_list.png",
            "title": "Unit Testing.pptx",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiMC1xZzRMZUZ2RzFSVnl5TWJ3MWw0ZjNZWWE4",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_powerpoint_list.png",
            "title": "Unit Testing.pptx",
            "editable": true
        }, {
            "id": "1o1k-6Es0fF5z2p7pDpVDQfYkBkSw0AmcxcMgDsVpyFU",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_form_list.png",
            "title": "TalentJam Survey",
            "editable": true
        }, {
            "id": "0B6ySiiO3UyBcNXVBSUdGNFllOTQ",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_excel_list.png",
            "title": "Report S2S.xlsx",
            "editable": true
        }, {
            "id": "0B6ySiiO3UyBcRmgwUjRXQW96LTA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_excel_list.png",
            "title": "Report DLST.xlsx",
            "editable": true
        }, {
            "id": "1ntbzlH3pSoW26fiJY5Sn3_UGOZRA0PvEQfRUgLqckbM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "EMC2 Angular",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiTWh0WWhoZGVjckNTZ3NVMU1CZHpFZmpVUDI4",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "Screen Shot 2014-08-14 at 8.22.17 am.png",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiYk44Y0Vob1hZWGM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "logo.png",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiZHI5enNKS0JEbDA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "logo.png",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHid2ItTGEyMG1FQms",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "Screen Shot 2014-08-14 at 8.22.17 am.png",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiU2RFMjRDRzdxWVE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_image_list.png",
            "title": "Screen Shot 2014-08-14 at 8.22.17 am.png",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiMjB5ckZva3ZKWDA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-AW-477- Abhinav,Walmart.doc__1407925998005.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHic1JCOWtkOUxOUzA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "CDS - Angular.JS-advanced.doc__1407925998021.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/1AO9HuoPkygh2U1fPq77SSwa0N8\"",
                "key": "QTAG8q1s7",
                "visibility": "PUBLIC",
                "value": "project"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/iWuwqb8fpU-Q5BZVmXyyldCF35Y\"",
                "key": "QTAGuqeic",
                "visibility": "PUBLIC",
                "value": "yumm"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/HIpfMJKnMVQw173pobJwecXwVvY\"",
                "key": "new",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHiUFJaRTBOWFBZWnM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "PO-AW-477- Abhinav,Walmart.doc__1407925998005.pdf",
            "description": "{\"ctags\":[{\"ctag\":\"DS\"}]}",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHic0tlNndiTHowTVk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "CDS - Angular.JS-advanced.doc__1407925998021.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/VNu9RzRopo-uSF_PnaY5U1oeTZ8\"",
                "key": "another",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/ITwbJ10rWDl30NtOvwZtoFRfiMw\"",
                "key": "yes",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHidEx3Y1VpLWtkLUE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "IN3670140813A979.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/E5AvjS05AXap2MwctudqChHWWYU\"",
                "key": "test",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/b6fHffePwLMytb06qXOp1DBS0Sg\"",
                "key": "qa",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHiYTgwNTBma2ozYUk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "IN3670140813A979.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHidjZWOFBlcVN5MWc",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "Wells Abhinav - 41450.pdf",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/4dbfCGyuKhLe2tcceFV2XMUDTms\"",
                "key": "workflow",
                "visibility": "PUBLIC",
                "value": "true"
            }]
        }, {
            "id": "0BxHZTpcWRBHibXdMeXRSUGN0TFE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "Wells Abhinav - 41450.pdf",
            "editable": true
        }, {
            "id": "1Kmx-Ur0BZl9fnG3L5gvRK8TZr9mXXPM-J9u26YSymX8",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "TDD Training",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiZ2NoOWtNaWE2bjg",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Resume_KrishanMurari_Dotnet.doc",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiSUJET1hhNnZPYTA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Resume_KrishanMurari_Dotnet.doc",
            "editable": true
        }, {
            "id": "1sIwQnkDYnBuEPj1YCSNBttjB4shodoZ2BBVjcoUWCrA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Walmart Discussion",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiSml3OVBtZVRWS2s",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Copy of angular-advanced.doc",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiR01WTlFzRTVjWnQxNUdmU3A5VGJQSTdFb1NV",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Venkat Ramana_Answers-for-Data Associate @QUEST Alliance.doc",
            "description": "334f4",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiaG5lSGh3Y3N6MGM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
            "title": "Quest",
            "description": "rtyu",
            "editable": true
        }, {
            "id": "0B0pZew86Q6vJQkgtZDZFM3VfeE0",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "knoeledge library architecture.pdf",
            "editable": true
        }, {
            "id": "1A2vK-trwqYdPeb6CM3pJo34gbjOckhKL1LdiwVYsmRk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Venkat Ramana_Answers-for-Data Associate @QUEST Alliance.doc",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHicWhsT241YUc2ZlBLY1pyVkJ6TmlLNVJDQjVZ",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Venkata Ramana, CV (Feb-2014).doc",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/JtyPWWBde8TvqigcsfCPr9rldbo\"",
                "key": "cv",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0BxHZTpcWRBHiVGJVNy1lVnlFZ28",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
            "title": "Gmail Attachments",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHia2FYZkNfbVkxdTQ",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "SP-CDS-TDD C# - Vivek.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHicDNLb1Y4ZmticWc",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png",
            "title": "TDD C# & .net.doc-Magesh.pdf",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiVURpdDlIbzBBNlU",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_collection_list.png",
            "title": "IFTTT",
            "editable": true
        }, {
            "id": "1WH91eecFTZwpjOHkkIBI7jdT-P1CpVX3uXMvcunxEeA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Database associate_ interview update",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiZ2wxOUxCQ3JDTWs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_9_archive_list.png",
            "title": "Task.zipx",
            "editable": true
        }, {
            "id": "1WuF8ZECoO8BU0Pk_J6L2uLVsuKwMgYhqgabY_JjTTAY",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Technology Specialist JD",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/K_kq4DZccwvnDL0WcDCG-W4BIjc\"",
                "key": "Technology",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "1ObR13lJDFvcOcwqmTKJsGBX-PnV1agh1FsFNYTlC5Gw",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Untitled document",
            "editable": true
        }, {
            "id": "1kjRnrt5Wcd3V9_U0Oz2S4mnX7Fvu_oha-k4zrnSjmdE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Angular Open Batch",
            "editable": true
        }, {
            "id": "1ado4fyeEO_zkzLZMPP-IL00eC3h5lqkMhPiM1jsrkQs",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Angular GE Aug",
            "editable": true
        }, {
            "id": "1U0WtW7Gu6iGiZJCWN-5297k9Vh1ae1r9lgHnTyxP5xQ",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Invoice WF Fargo Angular.docx",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiYlFMMlpLem5mb0N5SHlWbjY0Z3FSazlkcmpB",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Invoice_MVC_Honeywell_Abhinav.docx",
            "editable": true
        }, {
            "id": "1NDXa8_y-SNA-Y7sDd51-7OlVhw6zBDh6yLMdkUOSS9s",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Report-20140810124919",
            "editable": true
        }, {
            "id": "0BxHZTpcWRBHiRjVFSF94OEZBY0k",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_generic_list.png",
            "title": "Report-20140810124919.csv",
            "editable": true
        }, {
            "id": "10NP2rlgdyHLLCxEAtB0TYYNt4jp4ojPeW7JOCdFRfls",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "worldbank",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/_dr5MoTg0fr9oPuQ7gmzhI0SxfM\"",
                "key": "wb",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }, {
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/0C5i_3uZf8c2oUATp-s85WfxXZE\"",
                "key": "Diksha",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "0B7T8gasSevHiTzNhZzVJZzQ3ZEE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_shared_collection_list.png",
            "title": "Database associate",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiLS1pNnpQcEdsWDA",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "2nd round_Ravikant baghel.docx",
            "editable": true
        }, {
            "id": "0B7T8gasSevHicGk0NUdyeVpDNDQ",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "2nd round_Debadutta Rout.doc",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiZUlVbUlBM0xMZWM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "2nd round_Venkat.doc",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiSWZFbFdtZjZnNkk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "Venkata Ramana, CV (Feb-2014).doc",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiaTlYbThBZ0xJVlE",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "RaviKant Baghel.docx",
            "editable": true
        }, {
            "id": "0B7T8gasSevHiSERMb2RyY0szT2M",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_10_word_list.png",
            "title": "DEBADUTTA_ROUT .doc",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/JtyPWWBde8TvqigcsfCPr9rldbo\"",
                "key": "cv",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "1sXRZ3aDxf8G0TdRcAEen7L5f_oD6OK_MN-y4l5WlBlM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Untitled spreadsheet",
            "editable": true
        }, {
            "id": "18aY4iafoy0jk76COUTg2uqvk_oALUQe85QKfxTbbgZo",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Backup sheet",
            "editable": true
        }, {
            "id": "1C4LOS0r2m1A9JjOYbQkz2ar33-Wxhj0bzSuUTJ8welM",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Testaccounts",
            "editable": true
        }, {
            "id": "1gD981HZ190BUJF-3czZNX3DsFWvqp3cq-Z4QS4d-9gw",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
            "title": "Franz Kafka - The Blue Octavo Notebooks (1917-19)",
            "editable": false
        }, {
            "id": "1w7EJ6rsUF1pApzszDfrLebS13-LJDNJV0HcVEUtFdDk",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "AngularJS Pre-Assesment (Responses)",
            "editable": true,
            "properties": [{
                "kind": "drive#property",
                "etag": "\"fk0AzBEIhUhhdZ8fZzKcL1hA5NE/warm004LvIfS-Yrx8vDRbBEJTEY\"",
                "key": "hollu",
                "visibility": "PUBLIC",
                "value": "QTAG"
            }]
        }, {
            "id": "1rXC485xh8umN46alC4yYPgukj1Iv265HB-gJg5vxv0c",
            "iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_spreadsheet_list.png",
            "title": "Training Expenses",
            "editable": true
        }];



    angular.module('tjGoog', []).

    factory('goog', ['$q',

        function($q) {
            var userProfile = {};
            var isSigndIn = false;

            function retrieveAllFiles() {


                var deferred = $q.defer();
                // var retrievePageOfFiles = function(request, result) {
                //     request.execute(function(resp) {
                //         if (!resp || !resp.nextPageToken) {
                //             deferred.resolve(result);

                //         } else {
                //             result = result.concat(resp.items);
                //             var nextPageToken = resp.nextPageToken;
                //             if (nextPageToken) {
                //                 request = gapi.client.drive.files.list({
                //                     'pageToken': nextPageToken,
                //                     fields: fields
                //                 });
                //                 retrievePageOfFiles(request, result);
                //             }
                //         }
                //     });
                // }

                // var initialRequest = gapi.client.drive.files.list({
                //     fields: fields
                // });
                // retrievePageOfFiles(initialRequest, []);

                deferred.resolve(sample);

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
                retrieveAllFiles: retrieveAllFiles,
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