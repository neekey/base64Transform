
/*
 * GET home page.
 */
var Base64 = require( '../mods/base64.js' );
var FS = require( 'fs' );

module.exports = {

    index: function( req, res ){
        res.render('index', { title: 'Express' });
    },

    images: function ( req, res ){

        res.sendfile( req.url.replace( /^\//, '' ) );
    },

    decode: function ( req, res ){

        var path = 'tempfile/';
        var tempName = path + Date.now() + Math.random();
        var base64String = req.body.base64String;
        var filename = req.body.filename || 'temp';

        Base64.decode( base64String, tempName, function( err ){

            if( err ){
                res.send( JSON.stringify( err ) );
            }
            else {
                res.download( tempName, filename, function( err ){
                    if( err ){
                        res.send( JSON.stringify( err ) );
                    }
                    else {
                        // 删除文件
                        FS.unlink( tempName, function( err ){

                            if( err ){
                                console.log( err );
                            }
                        });
                    }
                });
            }
        });
    },

    encode: function( req, res ){

        var fileObj = req.files.file;

        Base64.encode( fileObj.path, function( err, base64String ){

            if( err ){
                res.send( JSON.stringify(err) );
            }
            else {
                res.render( 'encode-result', { layout: false,base64String: base64String } );

                // 删除文件
                FS.unlink( fileObj.path, function( err ){

                    if( err ){
                        console.log( err );
                    }
                });
            }
        });
    }
};