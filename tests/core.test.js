describe('Core', function() {
    var d = Descartes({})

    it('Empty style tree should contain no mapping', function() {
        expect(d.mapping).toBe({});
    });
});