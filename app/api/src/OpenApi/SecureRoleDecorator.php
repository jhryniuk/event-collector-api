<?php

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\PathItem;
use ApiPlatform\OpenApi\OpenApi;

final class SecureRoleDecorator implements OpenApiFactoryInterface
{
    public function __construct(
        private OpenApiFactoryInterface $decorated
    ) {
    }
    public function __invoke(array $context = []): OpenApi
    {
        $openApi = ($this->decorated)($context);
        $schemas = $openApi->getComponents()->getSchemas();

        $schemas['Roles'] = new \ArrayObject([
            'type' => 'object',
            'properties' => [
                'roles' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]
            ]
        ]);

        $pathItem = new PathItem(
            ref: 'Roles',
            get: new Operation(
                operationId: 'RolesList',
                tags: ['Roles'],
                responses: [
                    '200' => [
                        'description' => 'Get roles list',
                        'content' => [
                            'application/json' => [
                                'schema' => [
                                    '$ref' => '#/components/schemas/Roles',
                                ]
                            ]
                        ]
                    ]
                ],
                security: [],
            )
        );

        $openApi->getPaths()->addPath('/security/roles', $pathItem);

        return $openApi;
    }
}
