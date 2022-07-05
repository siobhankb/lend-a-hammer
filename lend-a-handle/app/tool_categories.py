from models import ToolCategory

tool_cat_dict1 = {
    #1
    {'cat_name':'power tools','parent_id':'null'},
    #2
    {
        'cat_name': 'drills',
        'parent_id': 1
    },
    #3
    {
        'cat_name': 'saws',
        'parent_id': 1
    },
    #4 
    {
        'cat_name': 'power sanders',
        'parent_id': 1
    },
    #5
    {
        'cat_name': 'nail guns',
        'parent_id': 1
    },
    #6
    {
        'cat_name': 'air tools',
        'parent_id': 1
    },
    #7
    {
        'cat_name':'hand tools',
        'parent_id':'null'
    },
    #8
    {
        'cat_name': 'hammers',
        'parent_id': 7
    },
    #9
    {
        'cat_name': 'pliers',
        'parent_id': 7
    },
    #10
    {
        'cat_name': 'wrenches',
        'parent_id': 7
    },
    #11
    {
        'cat_name': 'clamps',
        'parent_id': 7
    },
    #12
    {
        'cat_name': 'hand saws',
        'parent_id': 7
    },
    #13
    {
        'cat_name': 'axes & chisels',
        'parent_id': 7
    },
    #14
    {
        'cat_name': 'ladders',
        'parent_id': 7
    },
    #15
    {
        'cat_name': 'measuring tools',
        'parent_id': 7
    },
    #16
    {
        'cat_name': 'garden tools',
        'parent_id': 'null'
    },
    #17
    {
        'cat_name': 'digging tools',
        'parent_id': 16
    },
    #18
    {
        'cat_name': 'pruning and trimming tools',
        'parent_id': 16
    },
    #19
    {
        'cat_name': 'lawn tools',
        'parent_id': 16
    },
    #20
    {
        'cat_name': 'flooring tools',
        'parent_id': 'null'
    },
    #21
    {
        'cat_name': 'drywall tools',
        'parent_id': 'null'
    },
    #22
    {
        'cat_name': 'masonry tools',
        'parent_id': 'null'
    },
    #23
    {
        'cat_name': 'plumbing tools',
        'parent_id': 'null'
    },
    #24
    {
        'cat_name': 'cordless drills',
        'parent_id': 2
    },
    #25
    {
        'cat_name': 'corded drills',
        'parent_id': 2
    },
    #26
    {
        'cat_name': 'circular saw',
        'parent_id': 3
    },
    #27
    {
        'cat_name': 'mitre saw',
        'parent_id': 3
    },
    #28
    {
        'cat_name': 'jig saw',
        'parent_id': 3
    },
    #29
    {
        'cat_name': 'reciprocating saw',
        'parent_id': 3
    },
    #30
    {
        'cat_name': 'chain saw',
        'parent_id': 3
    },
    #31
    {
        'cat_name': 'orbital sander',
        'parent_id': 4
    },
    #32
    {
        'cat_name': 'belt sander',
        'parent_id': 4
    },
    #33
    {
        'cat_name': 'orbital sander',
        'parent_id': 4
    },
    #34
    {
        'cat_name': 'random orbit sander',
        'parent_id': 4
    },
    #35
    {
        'cat_name': 'nail gun',
        'parent_id': 5
    },
    #36
    {
        'cat_name': 'hydraulic riveter',
        'parent_id': 6
    },
    #37
    {
        'cat_name': 'axe',
        'parent_id': 13
    },
    #38
    {
        'cat_name': 'chisel',
        'parent_id': 13
    },
    #39
    {
        'cat_name': 'sqare shovel',
        'parent_id': 17
    },
    #40
    {
        'cat_name': 'pointed digger',
        'parent_id': 17
    },
    #41
    {
        'cat_name': 'pole tree pruner',
        'parent_id': 18
    },
    #42
    {
        'cat_name': 'loppers',
        'parent_id': 18
    },
    #43
    {
        'cat_name': 'lawn mower',
        'parent_id': 19
    },
    #44
    {
        'cat_name': 'grout remover',
        'parent_id': 20
    },
    #45
    {
        'cat_name': 'drywall knife',
        'parent_id': 21
    },
    #46
    {
        'cat_name': 'screed',
        'parent_id': 22
    },
    #47
    {
        'cat_name': 'pipe wrench',
        'parent_id': 23
    },
    #48
    {
        'cat_name': 'pipe cutter',
        'parent_id': 23
    },
    #49
    {
        'cat_name': 'pex tools',
        'parent_id': 23
    }
}

for c in tool_cat_dict1:
    ToolCategory(c)
