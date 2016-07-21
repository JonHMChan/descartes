describe('Core', function() {
    var d = new Descartes({})

    it('Empty style tree should contain no mapping', function() {
        expect(d.mappings).toEqual({});
    });
});